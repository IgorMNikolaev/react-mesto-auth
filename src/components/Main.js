import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, ...rest }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__info">
            <button onClick={onEditAvatar} className="profile__avatar-button">
              <div className="profile__avatar-cover"></div>
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="фотография профиля"
              />
            </button>
            <div className="profile__text">
              <div className="profile__name-edit">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  onClick={onEditProfile}
                  className="profile__edit-button"
                ></button>
              </div>
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button onClick={onAddPlace} className="profile__add-button"></button>
        </section>
        <ul className="elements">
          {cards.map((card) => (
            <Card key={card._id} {...card} {...rest} />
          ))}
        </ul>
      </main>
    </>
  );
}

export default Main;
