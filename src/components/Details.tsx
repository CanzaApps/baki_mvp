import { FC } from "react";
import { useSelector } from "react-redux";

const Details: FC = (): JSX.Element => {
  const {
    collateral,
    userNetMint,
    globalNetMint,
    globalDebt,
    userShare,
    userDebt,
    totalCollateral,
  } = useSelector((state: any) => state.baki);
  return (
    <div className="w-96 shadow-md mint-details p-2 ml-5">
      <p className="font-bold text-xl ">Open Position</p>
      <p className="px-3 font-bold mt-5">Current User Collateral</p>

      <div className="flex justify-between px-3">
        <p>{collateral}</p>
        <p>${totalCollateral.toFixed(2)}</p>
      </div>
      <div
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: "1px",
          marginTop: 10,
        }}
      ></div>

      <p className="px-3 font-bold mt-5">Outstanding zUSD Debt</p>
      <div className="flex justify-between px-3">
        <p>User Net Mint</p>
        <p>${userNetMint.toFixed(2)}</p>
      </div>
      <div className="flex justify-between px-3">
        <p>Global Net Mint</p>
        <p>${globalNetMint.toFixed(2)}</p>
      </div>
      <div className="flex justify-between px-3">
        <p>Global Debt</p>
        <p>${globalDebt.toFixed(2)}</p>
      </div>
      <div className="flex justify-between px-3">
        <p>User Share</p>
        <p>{userShare.toFixed(2)}%</p>
      </div>
      <div className="flex justify-between px-3">
        <p>User Debt</p>
        <p>${userDebt.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Details;
