import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import User from "./users/User";
import { useUserState } from "../context/User";
import UpdateUser from "./users/UpdateUser";
import Products from "./products/Products";
import UpdateProduct from "./products/updateProduct";
import Categories from "./categories/Categories";
import UpdateCategory from "./categories/UpdateCategory";
import Brands from "./brands/Brands";
import UpdateBrand from "./brands/UpdateBrands";
import CreateProduct from "./products/CreateProduct";
import CreateCategory from "./categories/CreateCategory";
import CreateBrand from "./brands/CreateBrand";
import Orders from "./orders/Orders";
import UpdateOrder from "./orders/UpdateOrder";

const PrivateRoutes = () => {
  const { user } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user]);

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/upd-user/:id" element={<UpdateUser />} />
        <Route path="/products" element={<Products />} />
        <Route path="/crt-prod" element={<CreateProduct />} />
        <Route path="/upd-prod/:id" element={<UpdateProduct />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/crt-cat" element={<CreateCategory />} />
        <Route path="/upd-cat/:id" element={<UpdateCategory />} />
        <Route path="/brand" element={<Brands />} />
        <Route path="/crt-brnd" element={<CreateBrand />} />
        <Route path="/upd-brnd/:id" element={<UpdateBrand />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/upd-ord/:id" element={<UpdateOrder />} />
      </Routes>
    </Layout>
  );
};

export default PrivateRoutes;
