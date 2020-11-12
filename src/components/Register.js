import React from "react";
import UserStatusWithForm from "./UserStatusWithForm";
import { Link, useHistory } from "react-router-dom";
import { register } from "../utils/auth";

function Register({ infoTooltipOpen, setSuccess }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const history = useHistory();

  const isSuccess = (x) => setSuccess(x);
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password).then((res) => {
      if (res.data) {
        setMessage("");
        history.push("/sign-in");
        isSuccess(true);
        infoTooltipOpen();
      } else {
        isSuccess(false);
        infoTooltipOpen();
        setMessage("Что-то пошло не так!");
      }
    });
  };

  return (
    <UserStatusWithForm
      name="login"
      title="Регистрация"
      onSubmit={handleSubmit}
    >
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
        Зарегистрироваться
      </button>
      <button className="popup__loading" disabled>
        <p className="popup__loading-text">Регистрация...</p>
      </button>
      <Link to="/sign-in" className="popup__login-link">
        Уже зарегистрированны? Войти
      </Link>
    </UserStatusWithForm>
  );
}

export default Register;
