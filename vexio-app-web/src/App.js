import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Reviews from "./pages/reviews";
import StoreTable from "./components/StoreTable";
import AccessModal from "./components/AccessModal";
import { CookiesProvider, useCookies } from "react-cookie";
import ReviewProduct from "./pages/reviewProduct";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  /* Create a client */
  const queryClient = new QueryClient();

  const [cookies, setCookie] = useCookies(["access_token"]);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={
                cookies.access_token !== undefined ? (
                  <Navigate to="/storeList" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/signup"
              element={
                cookies.access_token !== undefined ? (
                  <Navigate to="/storeList" />
                ) : (
                  <SignUp />
                )
              }
            ></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/reviews" element={<Reviews />}></Route>
            <Route path="/storeList" element={<StoreTable />}></Route>
            <Route
              path="/access_shopify"
              element={<AccessModal isOpen={true} />}
            />
            <Route path="/reviewProduct" element={<ReviewProduct />} />
          </Routes>
        </CookiesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
