import { FC, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import "../styles/pages/Swap.css";
import axios from "axios";
import { config } from "../config";
import MainLayout from "../Layouts/MainLayout";
import zXAF from "../assets/ZXAF.png";
import ZUSD from "../assets/ZUSD.png";
import ZNGN from "../assets/ZNGN.png";
import ZZAR from "../assets/ZZAR.png";
import { useSelector, useDispatch } from "react-redux";
import { updateSwapOutput } from "../redux/reducers/bakiReducer";
import SwapDetails from "../components/SwapDetails";
import { ethers } from "ethers";
import useBaki from "../hooks/useBaki";
import zToken from "../contracts/zToken.json";
axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;
declare const window: any;

const Swap: FC = (): JSX.Element => {
  const { swap } = useBaki();
  const dispatch = useDispatch();
  const [inputTokens] = useState([
    {
      name: "zXAF",
      image: zXAF,
    },
    {
      name: "zNGN",
      image: ZNGN,
    },
    {
      name: "zUSD",
      image: ZUSD,
    },
    {
      name: "zZAR",
      image: ZZAR,
    },
  ]);
  const [outputTokens] = useState([
    {
      name: "zXAF",
      image: zXAF,
    },
    {
      name: "zNGN",
      image: ZNGN,
    },
    {
      name: "zUSD",
      image: ZUSD,
    },
    {
      name: "zZAR",
      image: ZZAR,
    },
  ]);
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [isOutputOpen, setOutputIsOpen] = useState<boolean>(false);
  const [isInputOpen, setInputIsOpen] = useState<boolean>(false);
  const [selectedInput, setSelectedInput] = useState<string>(
    inputTokens[2].name
  );
  const [selectedOutput, setSelectedOutput] = useState<string>(
    outputTokens[1].name
  );
  const [fromAmount, setFromAmount] = useState<any>();
  const [toAmount, setToAmount] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [rate, setRate] = useState<any>();

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      let from = "";
      if (selectedInput === "zUSD") {
        from = config.zUSD;
      } else if (selectedInput === "zXAF") {
        from = config.zXAF;
      } else if (selectedInput === "zNGN") {
        from = config.zNGN;
      } else if (selectedInput === "zZAR") {
        from = config.zZAR;
      }

      setContract(new ethers.Contract(from, zToken, signer));
    }
  }, [provider, selectedInput]);
  const handleOutputSelect = () => {
    setOutputIsOpen(!isOutputOpen);
  };
  const handleInputSelect = () => {
    setInputIsOpen(!isInputOpen);
  };

  const getRates = async (base: string, target: string) => {
    const result = await axios.get(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=${target}&base=${base}`
    );
    return result.data.rates;
  };

  const handleSwap = async () => {
    if (selectedInput !== selectedOutput) {
      if (!loading) {
        setLoading(true);
        // Approve
        const multiple = 10 ** 18;

        let _amount = BigInt(Math.floor(fromAmount) * multiple);
        await contract.approve(config.vaultAddress, _amount);

        await swap(Math.floor(fromAmount), selectedInput, selectedOutput);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (fromAmount) {
      setLoading(true);
      getRates(selectedInput.substring(1), selectedOutput.substring(1))
        .then((result: any) => {
          if (selectedOutput.substring(1) === "NGN") {
            setRate(result.NGN);
            const output = result.NGN * fromAmount;
            dispatch(updateSwapOutput(output));
          }
          if (selectedOutput.substring(1) === "ZAR") {
            setRate(result.ZAR);
            const output = result.ZAR * fromAmount;
            dispatch(updateSwapOutput(output));
          }
          if (selectedOutput.substring(1) === "XAF") {
            setRate(result.XAF);
            const output = result.XAF * fromAmount;
            dispatch(updateSwapOutput(output));
          }
          if (selectedOutput.substring(1) === "USD") {
            setRate(result.USD);
            const output = result.USD * fromAmount;
            dispatch(updateSwapOutput(output));
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [fromAmount, selectedOutput, selectedInput]);

  return (
    <MainLayout>
      <div className="flex w-260 justify-around mt-10">
        <div className=" w-96 shadow-md rounded-lg">
          <div className="p-2 w-full justify-center items-center rounded-lg">
            <h1 className="font-bold">Swap</h1>

            <div className="mt-10">
              <label className="text-sm">Input</label>
              <SelectInput
                defaultToken={inputTokens[2]}
                setSelectedToken={setSelectedInput}
                setIsOpen={setInputIsOpen}
                isOpen={isInputOpen}
                handleSelect={handleInputSelect}
                tokens={inputTokens}
                value={fromAmount}
                setValue={setFromAmount}
              />
            </div>
            <div className="mt-10">
              <label className="text-sm">Output</label>
              <SelectOutput
                defaultToken={outputTokens[1]}
                setSelectedToken={setSelectedOutput}
                setIsOpen={setOutputIsOpen}
                isOpen={isOutputOpen}
                handleSelect={handleOutputSelect}
                tokens={outputTokens}
                value={toAmount}
                setValue={setToAmount}
              />
            </div>

            {fromAmount && (
              <SwapDetails
                rate={rate}
                from={selectedInput}
                to={selectedOutput}
              />
            )}
            <button className="swap-btn" onClick={handleSwap}>
              {loading ? "Loading..." : "Swap"}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

interface Props {
  tokens: any;
  isOpen: boolean;
  handleSelect: any;
  setIsOpen: any;
  setSelectedToken: any;
  defaultToken: any;
  value: number;
  setValue: any;
}
const SelectOutput: FC<Props> = ({
  tokens,
  isOpen,
  handleSelect,
  setIsOpen,
  setSelectedToken,
  defaultToken,
  value,
  setValue,
}): JSX.Element => {
  const [selectedTokenImg, setSelectedTokenImg] = useState<any>("");

  const { swapOutput } = useSelector((state: any) => state.baki);
  const select = (_token: any) => {
    setSelectedToken(_token.name);
    setSelectedTokenImg(_token.image);
    setIsOpen(!isOpen);
  };
  return (
    <div className=" border-2 p-2 rounded-lg">
      <div className="flex">
        <input
          type="text"
          placeholder="0.0"
          className="w-full focus:outline-none"
          value={swapOutput}
        />

        <div className="flex cursor-pointer" onClick={handleSelect}>
          <img
            src={selectedTokenImg || defaultToken.image}
            alt=""
            className="h-7"
          />
          <BiChevronDown size={30} />
        </div>
      </div>
      <div
        style={{
          transition: "all 0.3s ease-in-out",
          height: isOpen ? 170 : 0,
        }}
      >
        {tokens.map((token: any) => (
          <div
            key={token.name}
            onClick={(): void => select(token)}
            style={{
              transition: "all 0.3s ease-in-out",
              display: isOpen ? "flex" : "none",
            }}
            className="flex items-center hover:bg-red-100 p-2 cursor-pointer"
          >
            <img src={token.image} alt="" className="h-7" />
            <p className="ml-2 text-sm">{token.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface InputProp {
  tokens: any;
  isOpen: boolean;
  handleSelect: any;
  setIsOpen: any;
  setSelectedToken: any;
  defaultToken: any;
  value: number;
  setValue: any;
}

const SelectInput: FC<InputProp> = ({
  tokens,
  isOpen,
  handleSelect,
  setIsOpen,
  setSelectedToken,
  defaultToken,
  value,
  setValue,
}): JSX.Element => {
  const [selectedTokenImg, setSelectedTokenImg] = useState<any>("");

  const select = (_token: any) => {
    setSelectedToken(_token.name);
    setSelectedTokenImg(_token.image);
    setIsOpen(!isOpen);
  };
  return (
    <div className=" border-2 p-2 rounded-lg">
      <div className="flex">
        <input
          type="text"
          placeholder="0.0"
          className="w-full focus:outline-none"
          value={value}
          onChange={(e): void => setValue(e.target.value)}
        />

        <div className="flex cursor-pointer" onClick={handleSelect}>
          <img
            src={selectedTokenImg || defaultToken.image}
            alt=""
            className="h-7"
          />
          <BiChevronDown size={30} />
        </div>
      </div>
      <div
        style={{
          transition: "all 0.3s ease-in-out",
          height: isOpen ? 170 : 0,
        }}
      >
        {tokens.map((token: any) => (
          <div
            key={token.name}
            onClick={(): void => select(token)}
            style={{
              transition: "all 0.3s ease-in-out",
              display: isOpen ? "flex" : "none",
            }}
            className="flex items-center hover:bg-red-100 p-2 cursor-pointer"
          >
            <img src={token.image} alt="" className="h-7" />
            <p className="ml-2 text-sm">{token.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Swap;
