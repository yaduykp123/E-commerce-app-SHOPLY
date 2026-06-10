import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Home from "./Home";
import Login from "./Sign-In-up/Login";
import Register from "./Sign-In-up/Register";
import ForgotPassword from "./Sign-In-up/ForgotPassword";
import ResetPassword from "./Sign-In-up/ResetPassword";

import Header from "./CommonFiles/Header";
import Footer from "./CommonFiles/Footer";

import AddtoCart from "./CommonFiles/AddtoCart";
import ProductSingle from "./CommonFiles/ProductSingle";
import WhishList from "./CommonFiles/WhishList";
import Checkout from "./CommonFiles/Checkout";
import MyOrders from "./CommonFiles/MyOrders";
import ProductsAll from "./CommonFiles/ProductsAll";
import Brand from "./CATEGORY(Brand)/Brand";
import Budget from "./CATEGORY(Brand)/Budget";

import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

// user route protection
import UserRoute from "./CommonFiles/UserRoute";

// admin
import AdminRoute from "./Admin/routes/AdminRoute";
import AdminLayout from "./Admin/layout/AdminLayout";
import Dashboard from "./Admin/pages/Dashboard";
import Products from "./Admin/pages/Products";
import Users from "./Admin/pages/Users";
import Orders from "./Admin/pages/Orders";
import UserData from "./Admin/pages/UserData";
import Profile from "./CommonFiles/Profile";
import ModelComponent from "./CommonFiles/ModelComponent";
import PasswordModal from "./CommonFiles/PasswordModal";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

   const noLayoutRoutes = ["/login", "/register"];
  const isAuthPage = noLayoutRoutes.includes(location.pathname);

  const hideLayout = isAdmin || isAuthPage;

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
      
    </>
  );
};

function App() {
    

  return (
    <BrowserRouter>
      <LayoutWrapper>

       
        <Routes>
          
          {/* USER ROUTES */}
          <Route element={<UserRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/single-product/:id" element={<ProductSingle />} />
            <Route path="/cart" element={<AddtoCart />} />
            <Route path="/wishlist" element={<WhishList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/mobileBrand/:brand" element={<Brand />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route
              path="/mobileBudget/:minBudget/:maxBudget"
              element={<Budget />}
            />
            <Route path="/productsAll" element={<ProductsAll />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            } 
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users/:id" element={<UserData/>}/>
            <Route path="profile" element={<Profile/>}/>
          </Route>
        </Routes>

        {/* Toast components OUTSIDE Routes */}
        <ToastContainer />
        <Toaster position="top-right" />

      </LayoutWrapper>
      <ModelComponent/>
      <PasswordModal/>
    </BrowserRouter>



  );
}

export default App;
