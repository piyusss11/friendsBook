import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
function App() {
  // const { isAuthenticated } = useSelector((store: RootState) => store.user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
