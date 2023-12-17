import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Reviews from "./pages/reviews";
import StoreTable from "./components/StoreTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/reviews" element={<Reviews />}></Route>
        <Route path="/storeList" element={<StoreTable />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
