export default function connectWallet() {
  const connectWallet = async () => {
    if (window.ethereum) {
      alert("ethereum already");
      return await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  };
  return {
    connectWallet,
  };
}
