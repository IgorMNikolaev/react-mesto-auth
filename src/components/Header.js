import React from "react";

function Header({loggedIn}) {
  return (
    <>
      <header className="header">
        <div className="header__logo"></div>
        <a href="./sign-up" className="header__link">Регистрация</a>
      </header>
    </>
  );
}

export default Header;
