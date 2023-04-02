import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { RootState } from "../../app/store";

import InputField from "../../components/shared/inputField/InputField";
import TEXTS from "../../utils/texts";
import "./login.css";

const Login = () => {
  const lang: "en" | "he" = useSelector(
    (state: RootState) => state.general.lang
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { mutate, isLoading } = useLogin();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(loginInfo);
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="form-container">
          <form className="form" onSubmit={onSubmitHandler}>
            <InputField
              id="username-input"
              name="username"
              label={TEXTS[lang].login.username}
              value={loginInfo.username}
              onChange={onChangeHandler}
              required={true}
            />
            <InputField
              id="password-input"
              name="password"
              label={TEXTS[lang].login.password}
              type="password"
              value={loginInfo.password}
              onChange={onChangeHandler}
              required={true}
            />
            <button type="submit">{TEXTS[lang].login.submit}</button>
            <p>
              {TEXTS[lang].login.donthaveUser}
              <Link to="/signin">{TEXTS[lang].login.registerHere}</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
