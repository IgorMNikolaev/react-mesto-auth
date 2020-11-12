import React from "react";
import UserStatusWithForm from "./UserStatusWithForm";
import { useHistory } from "react-router-dom";
import { authorize } from "../utils/auth";
import { setToken } from "../utils/token";

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    authorize(email, password)
      .then((token) => {
        if (!token) {
          setMessage("Что-то пошло не так!");
        }

        if (token) {
          setToken(token);
          setEmail("");
          setPassword("");
          setMessage("");
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserStatusWithForm name="login" title="Вход" onSubmit={handleSubmit}>
      <div className="popup__input-cover">
        <input
          type="email"
          name="email"
          className="popup__input popup__input_status"
          required
          minLength="2"
          maxLength="40"
          onChange={handleEmailChange}
          value={email}
          placeholder="Email"
        />
        <span className="popup__input-error">{message}</span>
      </div>
      <div className="popup__input-cover">
        <input
          type="password"
          name="password"
          className="popup__input popup__input_status"
          required
          minLength="2"
          maxLength="200"
          onChange={handlePasswordChange}
          value={password}
          placeholder="Пароль"
        />
        <span className="popup__input-error">{message}</span>
      </div>
      <button
        type="submit"
        className="popup__submit-button popup__submit-button_status"
      >
        Войти
      </button>
      <button className="popup__loading" disabled>
        <p className="popup__loading-text">Вход...</p>
      </button>
    </UserStatusWithForm>
  );
}

export default Login;
