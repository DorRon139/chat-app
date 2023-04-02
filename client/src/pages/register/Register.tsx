import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useRegister } from "../../hooks/useRegister";

import InputField from "../../components/shared/inputField/InputField";
import TEXTS from "../../utils/texts";
import "./register.css";

const Register = () => {
  const lang: "en" | "he" = useSelector(
    (state: RootState) => state.general.lang
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { mutate, isLoading } = useRegister();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(userInfo);
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
              label={TEXTS[lang].registerForm.username}
              value={userInfo.username}
              onChange={onChangeHandler}
              required={true}
            />
            <InputField
              id="email-input"
              name="email"
              label={TEXTS[lang].registerForm.email}
              value={userInfo.email}
              onChange={onChangeHandler}
              required={true}
            />
            <InputField
              id="password-input"
              name="password"
              label={TEXTS[lang].registerForm.password}
              type="password"
              value={userInfo.password}
              onChange={onChangeHandler}
              required={true}
            />
            <button type="submit">{TEXTS[lang].registerForm.submit}</button>
            <p>
              {TEXTS[lang].registerForm.haveUser}{" "}
              <Link to="/login">{TEXTS[lang].registerForm.loginHere}</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
