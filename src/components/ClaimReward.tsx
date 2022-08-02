import { FC } from "react";
import "../styles/components/ClaimReward.css";

const ClaimReward: FC = () => {
  return (
    <div className="shadow-md p-2 ml-5 mb-3">
      <div className="mb-3">
        <h1 className="bold font-bold">Claim Reward</h1>
      </div>
      <div className="flex justify-around mb-2">
        <div className="p-3 detail">
          <p className="font-bold">
            <small>Total Staked</small>
          </p>
          <p>0.00</p>
        </div>
        <div className="p-3 detail">
          <p className="font-bold">
            <small>Pool Rate</small>
          </p>
          <p>0.00zUSD/day</p>
        </div>
        <div className="p-3 detail">
          <p className="font-bold">
            <small>Current APR</small>
          </p>
          <p>15.79%</p>
        </div>
      </div>
      <div className="p-3 claim-detail">
        <div className="flex justify-between align-center p-3">
          <p>Your liquidity deposits</p>
          <p>0.00</p>
        </div>
        <div className="flex justify-between align-center p-3">
          <p className="mt-3">Unclaimed zUSD</p>
          <div>
            <div>
              <div className="flex">
                <div className="bg-green-500 rounded-md p-1 mr-2 font-bold">
                  <small>claim</small>
                </div>
                <p> 0.00</p>
              </div>
            </div>
            <small className="font-small">⚡️0.0zUSD/day</small>
          </div>
        </div>
      </div>
      <button className="withdraw-btn">Withdraw</button>
    </div>
  );
};

export default ClaimReward;
