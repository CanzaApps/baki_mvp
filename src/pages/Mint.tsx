import { FC, useState } from "react";
import "../styles/pages/Mint.css";
import MainLayout from "../Layouts/MainLayout";
import MintComponent from "../components/Mint";
import Repay from "../components/Repay";
import Details from "../components/Details";

declare const window: any;

const Mint: FC = (): JSX.Element => {
  const [isMint, setIsMint] = useState<boolean>(true);
  window.ethereum.on("disconnect", () => {
    localStorage.removeItem("baki_user");
    alert("Please connect to Metamask");
  });
  return (
    <MainLayout>
      <div className="flex w-260 justify-around mt-10">
        <div>
          <div className="flex justify-around px-3">
            <button
              style={{
                backgroundColor: isMint ? "#fb5f33" : "#ccc",
                border: "1px solid #f5f5f5",
                padding: "5px",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: "bold",
                color: isMint ? "#fff" : "#000",
                width: "50%",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={(): void => setIsMint(true)}
            >
              Mint
            </button>
            <button
              style={{
                backgroundColor: !isMint ? "#fb5f33" : "#ccc",
                border: "1px solid #f5f5f5",
                padding: "5px",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: "bold",
                color: !isMint ? "#fff" : "#000",
                width: "50%",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={(): void => setIsMint(false)}
            >
              Repay
            </button>
          </div>
          {isMint ? <MintComponent /> : <Repay />}
        </div>
        <Details />
      </div>
    </MainLayout>
  );
};

export default Mint;
