import React from "react";
import { Route, Switch, Link } from "react-router-dom";

function Header({ onSignOut, userData }) {

  const { email } = userData;
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route path="/sign-up">
          <Link to="./sign-in" className="header__link">
            Вход
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="./sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/">
          <div className="header__user-info">
            <p className="header__email">{email}</p>
            <button onClick={onSignOut} className="header__button">
              Выход
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
