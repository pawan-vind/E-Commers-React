import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import ProductList from "./features/product-list/components/productList";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// react router dom
// import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/Auth/Components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserId } from "./features/cart/CartAPI";
import { checkAuthAsync, selectLoggedInUser, selectUserChecked, selectloggedInUser } from "./features/Auth/AuthSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import PageNotFound from "./pages/404";
import OrderSucessPage from "./pages/orderSucessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfile from "./features/user/components/UserProfile";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync, selectUserInfo } from "./features/user/userSlice";
import Logout from "./features/Auth/Components/Logout";
import ForgotPassword from "./features/Auth/Components/ForgotPassword";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/Auth/Components/ProtectedAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./pages/StripeCheckout";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cartpage",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSucessPage></OrderSucessPage>
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: (
     
        <ForgotPasswordPage></ForgotPasswordPage>
   
    ),
  },
  {
    path: "/stripe-checkout/",
    element: (
     <Protected>
      <StripeCheckout></StripeCheckout>
     </Protected>   
    ),
  },


  //******************************* Admin Routes ********************************************************************
  {
    path: "/admin",
    element: (
     <ProtectedAdmin>
        <AdminHomePage></AdminHomePage>
     </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/product-detail/:id",
    element: (
     <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
     </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
     <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
     </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
     <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
     </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
     <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
     </ProtectedAdmin>
    ),
  },

  {
    path: "*",
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
]);

// createRoot(document.getElementById("root")).render(

// );

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectloggedInUser)
  const userChecked = useSelector(selectUserChecked)


  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])

  
  useEffect(() => { 
   if(user){
    dispatch(fetchItemsByUserIdAsync())
    dispatch(fetchLoggedInUserAsync())
   }
  }, [dispatch, user])


  
  return (
    <div className="App"> 
      {userChecked && 
      <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>   
      }
    </div>
  );
}

export default App;
