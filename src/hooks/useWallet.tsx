import { useState } from "react";
import { useNavigate } from "react-router-dom";
declare const window: any;

const useWallet = () => {
  let navigate = useNavigate();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const connectWallet = (wallet: string) => {
    if (wallet === "metamask") {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result: Array<string>) => {
            setAddress(result[0]);
            localStorage.setItem("baki_user", result[0]);
            setIsConnected(true);
            navigate("/mint");
          });
      }
    }
  };
  return {
    connectWallet,
    isConnected,
    address,
  };
};

export default useWallet;
