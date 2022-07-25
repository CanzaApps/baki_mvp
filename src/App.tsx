import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Swap from "./pages/Swap";
import { FC } from "react";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </Router>
  );
};

export default App;
