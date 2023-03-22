import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import InputField from "../../components/shared/inputField/InputField";

import TEXTS from "../../utils/texts";
import "./register.css";

const Register = () => {
  const lang: "en" | "he" = useSelector(
    (state: RootState) => state.general.lang
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const res = await apiRequest("login", {
    //   ...input,
    // });
    // console.log(res);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmitHandler}>
        <InputField
          id="username-input"
          name="username"
          label={TEXTS[lang].registerForm.username}
          value={input.username}
          onChange={onChangeHandler}
          required={true}
        />
        <InputField
          id="email-input"
          name="email"
          label={TEXTS[lang].registerForm.email}
          value={input.email}
          onChange={onChangeHandler}
          required={true}
        />
        <InputField
          id="password-input"
          name="password"
          label={TEXTS[lang].registerForm.password}
          type="password"
          value={input.password}
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
  );
};

export default Register;
