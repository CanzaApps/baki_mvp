import { FC } from "react";

const Details: FC = (): JSX.Element => {
  return (
    <div className="w-96 shadow-md mint-details p-2 ml-5">
      <p className="font-bold text-xl ">Open Position</p>
      <p className="px-3 font-bold mt-5">Current User Collateral</p>
      <div className="flex justify-between px-3">
        <p>CELO</p>
        <p>$0</p>
      </div>
      <div className="flex justify-between px-3">
        <p>cUSD</p>
        <p>$0</p>
      </div>
      <div
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: "1px",
          marginTop: 10,
        }}
      ></div>
      <div className="flex justify-between px-3 mt-5">
        <p>Total</p>
        <p>$0</p>
      </div>
      <p className="px-3 font-bold mt-5">Outstanding zUSD Debt</p>
      <div className="flex justify-between px-3">
        <p>Global Debt</p>
        <p>$0</p>
      </div>
      <div className="flex justify-between px-3">
        <p>User Share</p>
        <p>0.0%</p>
      </div>
      <div className="flex justify-between px-3">
        <p>User Debt</p>
        <p>$0</p>
      </div>
    </div>
  );
};

export default Details;
