import { FC } from "react";
import "../styles/components/ClaimReward.css";

const ClaimReward: FC = () => {
  return (
    <div className="shadow-md p-2 ml-5 mb-3 mt-4">
      <div className="mb-3">
        <h1 className="bold font-bold">Claim Reward</h1>
      </div>

      <div className=" claim-detail">
        <div className="flex justify-between align-center p-3">
          <p>Unclaimed zUSD</p>
          <div>
            <div>
              <div>
                <p> 0.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="withdraw-btn">Claim</button>
    </div>
  );
};

export default ClaimReward;
