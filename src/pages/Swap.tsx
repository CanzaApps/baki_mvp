import React, { FC, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import "../styles/pages/Swap.css";
import MainLayout from "../Layouts/MainLayout";
import ZCFA from "../assets/ZCFA.png";
import ZUSD from "../assets/ZUSD.png";
import ZNGN from "../assets/ZNGN.png";
import ZZAR from "../assets/ZZAR.png";

const Swap: FC = (): JSX.Element => {
  const [isInputOpen, setInputIsOpen] = useState<boolean>(false);
  const [isOutputOpen, setOutputIsOpen] = useState<boolean>(false);
  const [selectedInput, setSelectedInput] = useState<string>("");
  const [selectedOutput, setSelectedOutput] = useState<string>("");

  const handleInputSelect = () => {
    setInputIsOpen(!isInputOpen);
  };
  const handleOutputSelect = () => {
    setOutputIsOpen(!isOutputOpen);
  };
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
      name: "zUSD",
      image: ZUSD,
    },
    {
      name: "zZAR",
      image: ZZAR,
    },
  ]);

  const swap = () => {
    if (selectedInput !== selectedOutput) {
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
                setSelectedToken={setSelectedInput}
                setIsOpen={setInputIsOpen}
                isOpen={isInputOpen}
                handleSelect={handleInputSelect}
                tokens={inputTokens}
              />
            </div>
            <div className="mt-10">
              <label className="text-sm">Output</label>
              <SelectInput
                setSelectedToken={setSelectedOutput}
                setIsOpen={setOutputIsOpen}
                isOpen={isOutputOpen}
                handleSelect={handleOutputSelect}
                tokens={outputTokens}
              />
            </div>

            <button className="swap-btn" onClick={swap}>
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
}
const SelectInput: FC<Props> = ({
  tokens,
  isOpen,
  handleSelect,
  setIsOpen,
  setSelectedToken,
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
        />

        <div className="flex cursor-pointer" onClick={handleSelect}>
          <img src={selectedTokenImg} alt="" className="h-7" />
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
export default Swap;
