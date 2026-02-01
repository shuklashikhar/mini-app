import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Pricelist from "./pages/Pricelist";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/pricelist" element={<Pricelist />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/pricelist" element={<Pricelist />} />
    </Routes>
  );
}

export default App;
