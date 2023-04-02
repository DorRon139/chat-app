import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { setLang } from "../../../app/general/generalSlice";
import { RootState } from "../../../app/store";
import { setCurrentUser, setToken } from "../../../app/user/user.slice";

import TEXTS from "../../../utils/texts";
import "./navigation.css";

const logo = require("../../../assets/logo.png");
const israelFlag = require("../../../assets/israelFlag.png");
const usFlag = require("../../../assets/usFlag.png");

const linkStyles = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#fff" : "#e2680a",
});

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const lang = useSelector((state: RootState) => state.general.lang);
  const isDisable = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) e.preventDefault();
  };
  const onChangeLanguage = async () => {
    if (lang === "en") await dispatch(setLang("he"));
    if (lang === "he") await dispatch(setLang("en"));
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setCurrentUser(null));
    dispatch(setToken(null));
  };

  return (
    <>
      <nav className={`navbar`}>
        <img className="navbar-logo" src={logo} alt="chat-app" />
        <div className={`navbar-actions ${lang === "he" ? "he" : ""}`}>
          <div className="navbar-application">
            <NavLink style={linkStyles} to="/" onClick={isDisable}>
              {TEXTS[lang].navbar.messanger}
            </NavLink>
            <NavLink style={linkStyles} to="/profile" onClick={isDisable}>
              {TEXTS[lang].navbar.profile}
            </NavLink>
            <NavLink style={linkStyles} to="/friends" onClick={isDisable}>
              {TEXTS[lang].navbar.friends}
            </NavLink>
            <NavLink style={linkStyles} to="/photos" onClick={isDisable}>
              {TEXTS[lang].navbar.myPhotos}
            </NavLink>
          </div>
          {currentUser ? (
            <NavLink style={linkStyles} onClick={logoutHandler} to="/login">
              {TEXTS[lang].navbar.logout}
            </NavLink>
          ) : (
            <NavLink style={linkStyles} to="/login">
              {TEXTS[lang].navbar.login}
            </NavLink>
          )}
        </div>
        <div className="language-div">
          <span>Language</span>
          <img
            className="navbar-language-icon"
            onClick={onChangeLanguage}
            src={lang === "en" ? israelFlag : usFlag}
            alt={lang === "en" ? "Hebrew" : "English"}
          />
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
