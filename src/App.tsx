import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Swap from "./pages/Swap";

import { useState, FC } from "react";
const App: FC = () => {
  const [isLoading] = useState(true);
  return (
    <div>
      {isLoading ? (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/mint" element={<Mint />} />
            <Route path="/swap" element={<Swap />} />
          </Routes>
        </Router>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
