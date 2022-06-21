import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Swap from "./pages/Swap";
import RequireAuth from "./components/RequireAuth";
import { FC } from "react";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route path="/mint" element={<Mint />} />
          <Route path="/swap" element={<Swap />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
