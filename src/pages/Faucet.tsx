import { FC, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import useFaucet from "../hooks/useFaucet";
const Faucet: FC = (): JSX.Element => {
  const { getCUSD, address, setAddress, myWallet } = useFaucet();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAction = () => {
    setLoading(true);
    getCUSD();
    setLoading(false);
  };
  return (
    <MainLayout>
      <div className="w-80 shadow-md rounded-lg p-2">
        <div className="flex justify-between">
          <h1>Get Test cUSD</h1>
          <button
            onClick={myWallet}
            style={{
              backgroundColor: "#fb5f33",
              padding: 5,
              borderRadius: 5,
              color: "white",
            }}
          >
            My Wallet
          </button>
        </div>
        <div className="border-2 p-2 rounded-lg mt-5">
          <input
            value={address}
            className="w-full focus:outline-none"
            type="text"
            placeholder="Enter wallet Address"
            onChange={e => setAddress(e.target.value)}
          />
        </div>

        {address && (
          <button className="mint-btn" onClick={handleAction}>
            {!loading && "Confirm"}
          </button>
        )}
      </div>
    </MainLayout>
  );
};

export default Faucet;
