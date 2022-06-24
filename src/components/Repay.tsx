import { FC, useState } from "react";
import CUSD from "../assets/cUSD.png";
import ZUSD from "../assets/ZUSD.png";
import useBaki from "../hooks/useBaki";
import { config } from "../config";

const Repay: FC = (): JSX.Element => {
  const [withdrawAmount, setWithdrawAmount] = useState<any>();
  const [repayAmount, setRepayAmount] = useState<any>();

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
    <div className=" w-96 shadow-md rounded-lg mt-7">
      <div className="p-2 w-full justify-center items-center rounded-lg">
        <p className="font-bold">Repay</p>
        <div className="mt-10">
          <label className="text-sm">Repay</label>
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
          <label className="text-sm">Withdraw</label>
          <div className="flex border-2 p-2 rounded-lg">
            <input
              type="text"
              placeholder="0.0"
              className="w-full focus:outline-none"
              value={withdrawAmount}
              onChange={e => setWithdrawAmount(e.target.value)}
            />
            <div>
              <img src={CUSD} alt="" className="h-7" />
            </div>
          </div>
        </div>
        <div className="text-sm mt-2">
          Total Collateral: <p className="font-bold">0.0 cUSD</p>
          Total Debt: <p className="font-bold">0.0 zUSD</p>
          Collateral Ratio: <p className="font-bold">0.0%</p>
        </div>
        <button className="mint-btn" onClick={handleRepay}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Repay;
