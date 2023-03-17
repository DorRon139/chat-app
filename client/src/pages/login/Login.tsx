import { useState } from "react";
import InputField from "../../components/shared/InputField";
import "./login.css";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmitHandler}>
        <InputField
          id="username-input"
          name="username"
          label="User Name"
          value={input.username}
          onChange={onChangeHandler}
          required={true}
        />
        <InputField
          id="password-input"
          name="password"
          label="Password"
          type="password"
          value={input.password}
          onChange={onChangeHandler}
          required={true}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
