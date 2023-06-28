import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";

const Layout = ({ stateProducts, dispatch }) => {
  return (
    <div>
      <ResponsiveAppBar stateProducts={stateProducts} dispatch={dispatch} />
      <Outlet />
    </div>
  );
};

export default Layout;
