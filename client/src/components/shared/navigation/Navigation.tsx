import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { setLang } from "../../../app/general/generalSlice";
import { RootState } from "../../../app/store";

const israelFlag = require("../../../assets/israelFlag.png");
const usFlag = require("../../../assets/usFlag.png");

const Navigation = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.general.lang);
  const onChangeLanguage = async () => {
    if (lang === "en") await dispatch(setLang("he"));
    if (lang === "he") await dispatch(setLang("en"));
  };
  return (
    <>
      <div>Navigation</div>
      <NavLink to="/">Messanger</NavLink>
      <NavLink to="/login">Login</NavLink>
      <p onClick={onChangeLanguage}>
        <img
          src={lang === "en" ? israelFlag : usFlag}
          alt={lang === "en" ? "Hebrew" : "English"}
        />
      </p>
      <Outlet />
    </>
  );
};

export default Navigation;
