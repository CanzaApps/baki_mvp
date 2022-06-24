import { FC, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import "../styles/pages/Swap.css";
import MainLayout from "../Layouts/MainLayout";
import ZCFA from "../assets/ZCFA.png";
import ZUSD from "../assets/ZUSD.png";
import ZNGN from "../assets/ZNGN.png";
import ZZAR from "../assets/ZZAR.png";
import { config } from "../config";
import useBaki from "../hooks/useBaki";

const Swap: FC = (): JSX.Element => {
  const { swap } = useBaki();
  const [inputTokens] = useState([
    {
      name: "zCFA",
      image: ZCFA,
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
      name: "zCFA",
      image: ZCFA,
    },
    {
      name: "zNGN",
      image: ZNGN,
    },

    {
      name: "zZAR",
      image: ZZAR,
    },
  ]);

  const [isOutputOpen, setOutputIsOpen] = useState<boolean>(false);
  const [selectedInput, setSelectedInput] = useState<string>(
    inputTokens[2].name
  );
  const [selectedOutput, setSelectedOutput] = useState<string>(
    outputTokens[1].name
  );
  const [fromAmount, setFromAmount] = useState<any>();
  const [toAmount, setToAmount] = useState<any>();
  const [zCFAzUSDPair] = useState<number>(621);
  const [zNGNzUSDPair] = useState<number>(415);
  const [zZARzUSDPair] = useState<number>(16);

  const handleOutputSelect = () => {
    setOutputIsOpen(!isOutputOpen);
  };

  const handleSwap = async () => {
    if (selectedInput !== selectedOutput) {
      try {
        if (selectedOutput === "zCFA") {
          await swap(fromAmount, config.zUSD, config.zCFA, zCFAzUSDPair);
        }
        if (selectedOutput === "zNGN") {
          await swap(fromAmount, config.zUSD, config.zNGN, zNGNzUSDPair);
        }
        if (selectedOutput === "zZAR") {
          await swap(fromAmount, config.zUSD, config.zZAR, zZARzUSDPair);
        }
        alert("Transaction successfully !!");
      } catch (error) {
        alert("Transaction unsuccessful !!");
      }
    }
  };
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
                value={fromAmount}
                method={setFromAmount}
                effect={setToAmount}
                rate={{
                  zZARzUSDPair,
                  zCFAzUSDPair,
                  zNGNzUSDPair,
                }}
                output={selectedOutput}
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
              />
            </div>

            <button className="swap-btn" onClick={handleSwap}>
              Swap
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
}
const SelectOutput: FC<Props> = ({
  tokens,
  isOpen,
  handleSelect,
  setIsOpen,
  setSelectedToken,
  defaultToken,
  value,
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
  value: any;
  method: any;
  defaultToken: any;
  effect: any;
  rate: any;
  output: any;
}

const SelectInput: FC<InputProp> = ({
  defaultToken,
  value,
  method,
  effect,
  rate,
  output,
}): JSX.Element => {
  return (
    <div className=" border-2 p-2 rounded-lg">
      <div className="flex">
        <input
          type="text"
          placeholder="0.0"
          className="w-full focus:outline-none"
          value={value}
          onChange={e => {
            method(e.target.value);
            if (output === "zNGN") {
              effect(parseInt(e.target.value) * rate.zNGNzUSDPair);
            }
            if (output === "zCFA") {
              effect(parseInt(e.target.value) * rate.zCFAzUSDPair);
            }
            if (output === "zZAR") {
              effect(parseInt(e.target.value) * rate.zZARzUSDPair);
            }
          }}
        />

        <div className="flex cursor-pointer">
          <img src={defaultToken.image} alt="" className="h-7" />
        </div>
      </div>
    </div>
  );
};
export default Swap;
