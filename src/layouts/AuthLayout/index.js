import React from "react";
import { Outlet } from "react-router-dom";
import googlePlay from "../../assert/Image/googleplay.png";
import appstore from "../../assert/Image/appstore.png";
import forwardBack from "../../assert/Image/Group 97.png";
import mobilelogo from "../../assert/Image/Group 808.png";
import IbankCareLogo from "../../assert/Image/Group 813.png";

const AuthLayout = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12 col-12">
            <Outlet />
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 col-12">
            <div>
              <div className="pay-bg mx-0 mobile-relative">
                <div>
                  <div className="pay-head">
                    <p>
                      Getting Easier <br /> Pay for Any Transfer
                      <span style={{ color: "rgba(248, 173, 21, 1)" }}>
                        <br />
                        with IbankCare
                      </span>
                    </p>
                  </div>
                  <p style={{ fontSize: "12px" }}>
                    Install Ibankcare application right now!
                  </p>
                </div>
                <div className="d-flex my-4">
                  <div>
                    <img
                      src={googlePlay}
                      alt="googlePlay_logo"
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <img src={appstore} alt="appstore_logo" width="img-fluid" />
                  </div>
                </div>

                <div>
                  <div>
                    <img src={forwardBack} alt="forwardBack_logo" width="10%" />
                  </div>
                  <div className="mobileImg">
                    <img src={mobilelogo} alt="mobilelogo" className="" />
                  </div>
                  <div className="bankCareLogo">
                    <img
                      src={IbankCareLogo}
                      alt="IbankCareLogo"
                      width="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
