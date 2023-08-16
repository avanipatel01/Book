import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{ backgroundColor: "#fff", height: "100vh" }}
        className="p-5 content text-center"
      >
        <h5 className="mt-5">404 Page not found</h5>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn signin-btn w-25"
        >
          Dashboard
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
