import { FC, useState } from "react";
import "../styles/components/SwapDetails.css";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useSelector } from "react-redux";

interface SwapDetailsProps {
  from: string;
  to: string;
  rate: number;
}

const SwapDetails: FC<SwapDetailsProps> = ({ from, to, rate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { swapOutput } = useSelector((state: any) => state.baki);
  const [infiniteApprove, setInfiniteApprove] = useState<boolean>(true);

  const _infinitApprove = () => {
    window.localStorage.setItem(
      "infiniteApprove",
      JSON.stringify(!infiniteApprove)
    );
    setInfiniteApprove(!infiniteApprove);

    if (infiniteApprove) {
      window.localStorage.removeItem("zUSD");
      window.localStorage.removeItem("zNGN");
      window.localStorage.removeItem("zXAF");
      window.localStorage.removeItem("zZAR");
    }
  };
  return (
    <div className="swap-detail">
      <div className="flex justify-between px-3">
        <p>
          <small>
            <span className="font-bold mr-1">
              1 {from} = {rate?.toFixed(3)}
              {to}
            </span>
            ($0.0)
          </small>
        </p>
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
        </div>
      </div>
      <div
        style={{
          transition: "all 0.3s ease-in-out",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <div className="flex justify-between px-3">
          <p>Expected Output</p>
          <p
            className="font-bold mt-1"
            style={{
              fontSize: 12,
            }}
          >
            {swapOutput.toFixed(3) - (0.3 / 100) * swapOutput} {to}
          </p>
        </div>
        <div className="flex justify-between px-3">
          <p>Infinite Approval</p>
          <div className="switch" onClick={_infinitApprove}>
            <div
              className="toggler"
              style={{
                marginLeft: infiniteApprove ? "50%" : 0,
                backgroundColor: infiniteApprove ? "#fb5f33" : "#ccc",
                color: infiniteApprove ? "#fff" : "#000",
              }}
            >
              <p>{infiniteApprove ? "ON" : "OFF"}</p>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            marginTop: "10px",
            backgroundColor: "#ccc",
          }}
        ></div>
        <div className="flex justify-between px-3 mt-2">
          <p>
            <small>Liquidity provider fee</small>
          </p>
          <p>
            <small>0.3%</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwapDetails;
