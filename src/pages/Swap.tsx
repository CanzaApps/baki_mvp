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

import useBaki from "../hooks/useBaki";
axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;

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

  const handleOutputSelect = () => {
    setOutputIsOpen(!isOutputOpen);
  };
  const handleInputSelect = () => {
    setInputIsOpen(!isInputOpen);
  };

  const getRates = async (base: string, target: string) => {
    const result = await axios.get(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=${target}base=${base}`
    );
    return result.data.rates;
  };

  const handleSwap = async () => {
    if (selectedInput !== selectedOutput) {
      // get rates
      if (!loading) {
        swap(fromAmount, selectedInput, selectedOutput);
      }
    }
  };

  useEffect(() => {
    if (fromAmount) {
      setLoading(true);
      axios
        .get(
          `https://api.apilayer.com/exchangerates_data/latest?symbols=${selectedOutput.substring(
            1
          )}&base=${selectedInput.substring(1)}`
        )
        .then((res: any) => {
          if (selectedOutput.substring(1) === "NGN") {
            setRate(res.data.rates.NGN);
            const output = res.data.rates.NGN * fromAmount;
            dispatch(updateSwapOutput(output));
          }
          if (selectedOutput.substring(1) === "ZAR") {
            setRate(res.data.rates.ZAR);
            const output = res.data.rates.ZAR * fromAmount;
            dispatch(updateSwapOutput(output));
          }
          if (selectedOutput.substring(1) === "XAF") {
            setRate(res.data.rates.XAF);
            const output = res.data.rates.XAF * fromAmount;
            dispatch(updateSwapOutput(output));
          }
          if (selectedOutput.substring(1) === "USD") {
            setRate(res.data.rates.USD);
            const output = res.data.rates.USD * fromAmount;
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
