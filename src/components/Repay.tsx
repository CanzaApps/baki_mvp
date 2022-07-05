import { FC, useState } from "react";
import CUSD from "../assets/cUSD.png";
import ZUSD from "../assets/ZUSD.png";
import useBaki from "../hooks/useBaki";
import AVAX from "../assets/avax.png";
import USDK from "../assets/usdk.png";
import { BiChevronDown } from "react-icons/bi";

import { config } from "../config";

const Repay: FC = (): JSX.Element => {
  const [withdrawAmount, setWithdrawAmount] = useState<any>();
  const [repayAmount, setRepayAmount] = useState<any>();
  const [isInputOpen, setInputIsOpen] = useState<boolean>(false);
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
  const { repay } = useBaki();

  const handleRepay = async () => {
    try {
      await repay(repayAmount, withdrawAmount, config.zUSD, 415);
      alert("Transaction successfully !!");
      setWithdrawAmount(0);
      setRepayAmount(0);
    } catch (error) {
      alert("Transaction unsuccessful !!");
    }
  };
  return (
    <div className=" w-100 shadow-md rounded-lg mt-7">
      <div className="p-2 w-full justify-center items-center rounded-lg">
        <p className="font-bold">Repay</p>
        <div className="mt-10">
          <label className="text-sm">Repay zUSD</label>
          <div className="flex border-2 p-2 rounded-lg">
            <input
              type="text"
              placeholder="0.0"
              className="w-full focus:outline-none"
              value={repayAmount}
              onChange={e => setRepayAmount(e.target.value)}
            />
            <div>
              <img src={ZUSD} alt="" className="h-7" />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="mt-10">
            <label className="text-sm">Withdraw Collateral</label>
            <SelectCollateral
              defaultToken={collaterals[0]}
              setSelectedToken={setSelectedInput}
              setIsOpen={setInputIsOpen}
              isOpen={isInputOpen}
              handleSelect={handleInputSelect}
              tokens={collaterals}
              value={withdrawAmount}
              updateCollateralValue={setWithdrawAmount}
            />
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
            <span>Price:</span> 1 <b>{selectedInput}</b> = 1 <b>zUSD</b>
          </p>
        </div>
        <button className="mint-btn" onClick={handleRepay}>
          Repay & Withdraw
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
export default Repay;
