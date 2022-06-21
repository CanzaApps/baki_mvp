import { useNavigate } from "react-router-dom";
declare const window: any;

const useWallet = () => {
  let navigate = useNavigate();

  const connectWallet = (wallet: string) => {
    if (wallet === "metamask") {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result: Array<string>) => {
            localStorage.setItem("baki_user", result[0]);
            navigate("/mint");
          });
      }
    }
  };

  const getWalletBallance = (): any => {};

  window.ethereum.removeListener("accountsChanged", () => {});
  return {
    connectWallet,
    getWalletBallance,
  };
};

export default useWallet;
