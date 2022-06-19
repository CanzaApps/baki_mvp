import React, { FC } from "react";
import "../styles/pages/Swap.css";
import MainLayout from "../Layouts/MainLayout";
import CUSD from "../assets/cUSD.png";
import ZUSD from "../assets/ZUSD.png";
const Swap: FC = (): JSX.Element => {
  return (
    <MainLayout>
      <div className="flex w-260 justify-around mt-10">
        <div className=" w-96 shadow-md rounded-lg">
          <div></div>
          <div className="p-2 w-full justify-center items-center rounded-lg">
            <p className="font-bold">Swap</p>
            <div className="mt-10">
              <label className="text-sm">Deposit</label>
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
            <div className="mt-10">
              <label className="text-sm">Mint</label>
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

            <button className="swap-btn">Swap</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Swap;
