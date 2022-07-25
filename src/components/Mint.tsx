import { FC, useState, useEffect } from "react";
import CUSD from "../assets/cUSD.png";
import useBaki from "../hooks/useBaki";
import AVAX from "../assets/avax.png";
import USDK from "../assets/usdk.png";
import ZUSD from "../assets/ZUSD.png";
import { config } from "../config";
import redstone from "redstone-api";
import { BiChevronDown } from "react-icons/bi";

import axios from "axios";
axios.defaults.baseURL = `https://api.coinlayer.com/api/live?access_key=${config.coinlayerAPIKEY}`;

const MintComponent: FC = (): JSX.Element => {
  const [depositAmount, setDepositAmount] = useState<any>();
  const [mintAmount, setMintAmount] = useState<any>();
  const { deposit, mint } = useBaki();
  const [isInputOpen, setInputIsOpen] = useState<boolean>(false);
  const [avaxRate, setAvaxRate] = useState<any>(false);
  const [collaterals] = useState([
    {
      name: "cUSD",
      image: CUSD,
    },
    {
      name: "USDK",
      image: USDK,
    },

    {
      name: "AVAX",
      image: AVAX,
    },
  ]);

  const [selectedInput, setSelectedInput] = useState<string>(
    collaterals[0].name
  );
  const handleInputSelect = () => {
    setInputIsOpen(!isInputOpen);
  };
  const getAvaxRate = async () => {
    const price = await redstone.getPrice("AVAX");
    setAvaxRate(price.value);
  };

  const handleDeposit = async () => {
    try {
      await deposit(depositAmount, mintAmount);
      alert("Transaction was successful !!");
      setDepositAmount(0);
      setMintAmount(0);
    } catch (error) {}
  };
  const handleMint = async () => {
    try {
      await mint(mintAmount);
      alert("Transaction was successful !!");
      setDepositAmount(0);
      setMintAmount(0);
    } catch (error) {
      alert("Transaction was !!");
    }
  };

  const controller = async () => {
    if (depositAmount && mintAmount) {
      await handleDeposit();
    }
    if (!depositAmount && mintAmount) {
      await handleMint();
    }
  };

  useEffect(() => {
    if (selectedInput === "AVAX") {
      getAvaxRate();
    }
  }, [selectedInput]);
  return (
    <div className=" w-95 shadow-md rounded-lg mt-7">
      <div className="p-2 w-full justify-center items-center rounded-lg">
        <p className="font-bold">Mint</p>
        <div className="mt-10">
          <div className="mt-10">
            <label className="text-sm">Deposit Collateral</label>
            <SelectCollateral
              defaultToken={collaterals[0]}
              setSelectedToken={setSelectedInput}
              setIsOpen={setInputIsOpen}
              isOpen={isInputOpen}
              handleSelect={handleInputSelect}
              tokens={collaterals}
              value={depositAmount}
              updateCollateralValue={setDepositAmount}
            />
          </div>
        </div>
        <div className="mt-10">
          <label className="text-sm">Mint</label>
          <div className="flex border-2 p-2 rounded-lg">
            <input
              type="text"
              placeholder="0.0"
              value={mintAmount}
              onChange={e => setMintAmount(e.target.value)}
              className="w-full focus:outline-none"
            />
            <div>
              <img src={ZUSD} alt="" className="h-7" />
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          <button className="w-1/3 mx-1 chip">15 %</button>
          <button className="w-1/3 mx-1 chip">30 %</button>
          <button className="w-1/3 mx-1 chip">50 %</button>
          <button className="w-1/3 mx-1 chip">65 %</button>
          <div className="chip">
            <input
              type="text"
              className="focus:outline-none"
              placeholder="Custom"
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            %
          </div>
        </div>
        <div className="text-sm mt-2 flex justify-center">
          <div className="p-2">
            <p>Total Collateral</p>
            <p className="font-bold text-center">
              0.0 <b>{selectedInput}</b>
            </p>
          </div>
          <div className="p-2">
            <p>Total Debt</p>
            <p className="font-bold text-center">0.0 zUSD</p>
          </div>
          <div className="p-2">
            <p>Collateral Ratio:</p>
            <p className="font-bold text-center">0.0%</p>
          </div>
        </div>
        <div className="pt-3">
          <p>
            <span className="p-2">Price:</span>
            {selectedInput === "AVAX" ? avaxRate.toString().slice(0, 6) : "1"}
            <b>zUSD</b> = 1<b>{selectedInput}</b>
          </p>
        </div>
        <button className="mint-btn" onClick={controller}>
          Deposit & Mint
        </button>
      </div>
    </div>
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
  updateCollateralValue: any;
}
const SelectCollateral: FC<Props> = ({
  tokens,
  isOpen,
  handleSelect,
  setIsOpen,
  setSelectedToken,
  defaultToken,
  value,
  updateCollateralValue,
}): JSX.Element => {
  const [selectedTokenImg, setSelectedTokenImg] = useState<any>("");
  const { changeNetwork } = useBaki();

  const select = (_token: any) => {
    setSelectedToken(_token.name);
    setSelectedTokenImg(_token.image);
    setIsOpen(!isOpen);
    changeNetwork(_token.name);
  };
  return (
    <div className=" border-2 p-2 rounded-lg">
      <div className="flex">
        <input
          type="text"
          placeholder="0.0"
          className="w-full focus:outline-none"
          value={value}
          onChange={e => updateCollateralValue(e.target.value)}
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
          height: isOpen ? 140 : 0,
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

export default MintComponent;

// http://api.coinlayer.com/api/live?access_key=49505e855f2ab02b59638b6895755f23&symbols=BTC,ETH
