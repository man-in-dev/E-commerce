import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Layout from "./components/Layout";
// import User from "./pages/User";
// import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import PrivateRoutes from "./pages/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<PrivateRoutes />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
