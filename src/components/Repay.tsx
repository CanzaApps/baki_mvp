import { FC } from "react";
import CUSD from "../assets/cUSD.png";
import ZUSD from "../assets/ZUSD.png";
const Repay: FC = (): JSX.Element => {
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
        <button className="mint-btn">Withdraw</button>
      </div>
    </div>
  );
};

export default Repay;
