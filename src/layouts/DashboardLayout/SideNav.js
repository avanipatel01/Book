import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserLogo from "../../assert/Image/Ellipse 45.png";
import { Nav } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/action/AuthAction";
import {
  BsFillHouseDoorFill,
  BsPersonFill,
  BsFillExclamationCircleFill,
} from "react-icons/bs";

export const SideNav = ({ show, hide }) => {
  const { profile } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let navItem = "";

  useEffect(() => {
    navItem = document.querySelectorAll("#hoverEffect a");
    navItem.forEach((item) => {
      item.addEventListener("click", (e) => {
        navItem.forEach((item) => {
          item.classList.remove("selected");
        });
        e.target.classList.add("selected");
      });
    });
  }, []);

  const logoutHandler = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <div id="sidenav">
      <div className={`sidebar show d-none d-lg-block`} id="hoverEffect">
        <div onClick={() => hide()}>
          <button
            type="button"
            className={`btn-close clsBtn`}
            disabled
            aria-label="Close"
          ></button>
        </div>
        <div className="my-4 text-center">
          <h2 style={{ color: "#034B5E" }}>
            Book
            <span style={{ color: "#FCBA2D" }}> Store</span>
          </h2>
        </div>
        <Nav style={{ height: "80vh" }}>
          <div className="w-100">
            <p className="history-text ps-4 mt-5" style={{ color: "#034B5E" }}>
              General
            </p>

            <div className="px-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "active" : "sidebar_text"
                }
              >
                <div className="d-flex align-items-center py-2">
                  <span className="col-lg-3 col-sm-3 text-center">
                    <BsFillHouseDoorFill />
                  </span>
                  <div className="col-lg-9 col-sm-9">Book</div>
                </div>
              </NavLink>
              <NavLink
                to="/author"
                className={({ isActive }) =>
                  isActive ? "active" : "sidebar_text"
                }
              >
                <div className="d-flex align-items-center py-2">
                  <span className="col-lg-3 col-sm-3 text-center">
                    <BsPersonFill />
                  </span>
                  <div className="col-lg-9 col-sm-9">Author</div>
                </div>
              </NavLink>
            </div>
            <hr style={{ color: "#C4C4C4" }} />

            <p className="history-text ps-4" style={{ color: "#034B5E" }}>
              Other
            </p>

            <NavLink
              to="/help"
              className={({ isActive }) =>
                isActive ? "active" : "sidebar_text"
              }
            >
              <div className="d-flex align-items-center py-2">
                <span className="col-lg-3 col-sm-3 text-center">
                  <BsFillExclamationCircleFill />
                </span>
                <div className="col-lg-9 col-sm-9"> Help & Support</div>
              </div>
            </NavLink>
          </div>

          <div className="mt-auto">
            <div className="d-flex align-items-center">
              <span className="col-lg-3 col-sm-3 text-center">
                <img
                  src={UserLogo}
                  alt="UserLogo"
                  className="img-fluid"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                />
              </span>
              <div className="my-4 ">
                <p className="sidebar_text mb-0">{profile?.name}</p>
                <p className="sidebar_text">{profile?.email}</p>
              </div>
            </div>
            <div className="sidebar_text cursor">
              <div
                className="d-flex align-items-center"
                onClick={() => logoutHandler()}
              >
                <span className="col-lg-3 col-sm-3 text-center">
                  <BiLogOut />
                </span>
                <div className="col-lg-9 col-sm-9">Log Out</div>
              </div>
            </div>
          </div>
        </Nav>
      </div>

      {show && (
        <div className={`sidebar show`} id="hoverEffect">
          <div onClick={() => hide()}>
            <button
              type="button"
              className={`btn-close clsBtn`}
              disabled
              aria-label="Close"
            ></button>
          </div>
          <div className="my-4 text-center">
            <h2 style={{ color: "#034B5E" }}>
              Book
              <span style={{ color: "#FCBA2D" }}> Store</span>
            </h2>
          </div>
          <Nav className="" style={{ height: "80vh" }}>
            <div className="w-100">
              <p
                className="history-text ps-4 mt-5"
                style={{ color: "#034B5E" }}
              >
                General
              </p>

              <div className="px-3">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "active" : "sidebar_text"
                  }
                >
                  <div className="d-flex align-items-center py-2">
                    <span className="col-lg-3 col-sm-3 text-center">
                      <BsFillHouseDoorFill />
                    </span>
                    <div className="col-lg-9 col-sm-9">Book</div>
                  </div>
                </NavLink>
                <NavLink
                  to="/author"
                  className={({ isActive }) =>
                    isActive ? "active" : "sidebar_text"
                  }
                >
                  <div className="d-flex align-items-center py-2">
                    <span className="col-lg-3 col-sm-3 text-center">
                      <BsPersonFill />
                    </span>
                    <div className="col-lg-9 col-sm-9">Author</div>
                  </div>
                </NavLink>
              </div>
              <hr style={{ color: "#C4C4C4" }} />

              <p className="history-text ps-4" style={{ color: "#034B5E" }}>
                Other
              </p>

              <NavLink
                to="/help"
                className={({ isActive }) =>
                  isActive ? "active" : "sidebar_text"
                }
              >
                <div className="d-flex align-items-center py-2">
                  <span className="col-lg-3 col-sm-3 text-center">
                    <BsFillExclamationCircleFill />
                  </span>
                  <div className="col-lg-9 col-sm-9"> Help & Support</div>
                </div>
              </NavLink>
            </div>

            <div className="mt-auto">
              <div className="d-flex align-items-center">
                <span className="col-lg-3 col-sm-3 text-center">
                  <img
                    src={UserLogo}
                    alt="UserLogo"
                    className="img-fluid"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  />
                </span>
                <div className="my-4 ">
                  <p className="sidebar_text mb-0">{profile?.name}</p>
                  <p className="sidebar_text">{profile?.email}</p>
                </div>
              </div>
              <div className="sidebar_text cursor ">
                <div
                  className="d-flex align-items-center logout"
                  onClick={() => logoutHandler()}
                >
                  <span className="col-lg-3 col-sm-3 text-center">
                    <BiLogOut />
                  </span>
                  <div className="col-lg-9 col-sm-9">Log Out</div>
                </div>
              </div>
            </div>
          </Nav>
        </div>
      )}
    </div>
  );
};
