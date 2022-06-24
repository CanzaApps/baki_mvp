import { FC, useState } from "react";
import CUSD from "../assets/cUSD.png";
import ZUSD from "../assets/ZUSD.png";
import useBaki from "../hooks/useBaki";

const MintComponent: FC = (): JSX.Element => {
  const [depositAmount, setDepositAmount] = useState<any>();
  const [mintAmount, setMintAmount] = useState<any>();
  const { deposit, mint } = useBaki();

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

  return (
    <div className=" w-96 shadow-md rounded-lg mt-7">
      <div className="p-2 w-full justify-center items-center rounded-lg">
        <p className="font-bold">Mint</p>
        <div className="mt-10">
          <label className="text-sm">Deposit</label>
          <div className="flex border-2 p-2 rounded-lg">
            <input
              type="text"
              placeholder="0.0"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
              className="w-full focus:outline-none"
            />

            <div>
              <img src={CUSD} alt="" className="h-7" />
            </div>
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
        <div className="text-sm mt-2">
          Total Collateral: <p className="font-bold">0.0 cUSD</p>
          Total Debt: <p className="font-bold">0.0 zUSD</p>
          Collateral Ratio: <p className="font-bold">0.0%</p>
        </div>
        <button className="mint-btn" onClick={controller}>
          Mint
        </button>
      </div>
    </div>
  );
};

export default MintComponent;
