import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { SideNav } from "./SideNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileHandler } from "../../store/action/AuthAction";
import Loader from "../../components/Loader";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const hideNavHandler = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(getProfileHandler(navigate));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header hide={hideNavHandler} />
      <SideNav show={show} hide={hideNavHandler} />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
