import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/shared/inputField/InputField";
import { apiRequest } from "../../utils/api-request";
import { Link } from "react-router-dom";

import TEXTS from "../../utils/texts";
import "./login.css";
import { RootState } from "../../app/store";

const Login = () => {
  const lang: "en" | "he" = useSelector(
    (state: RootState) => state.general.lang
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await apiRequest("login", {
      ...input,
    });
    console.log(res);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmitHandler}>
        <InputField
          id="username-input"
          name="username"
          label={TEXTS[lang].login.username}
          value={input.username}
          onChange={onChangeHandler}
          required={true}
        />
        <InputField
          id="password-input"
          name="password"
          label={TEXTS[lang].login.password}
          type="password"
          value={input.password}
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
  );
};

export default Login;
