import React from "react";
import trashPath from "../images/trash.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({
  name,
  likes,
  link,
  _id,
  onCardClick,
  onCardDelete,
  owner,
  onCardLike,
  ...rest
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const handleClick = () => onCardClick({ name, link });
  const handleLike = () => onCardLike({ likes, _id });
  const handleDelete = () => onCardDelete(_id);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((i) => i === currentUser._id);
  const cardDeleteButtonClassName = `element__trash-button ${
    isOwn ? "" : "element__trash-button-inactiv"
  }`;
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_activ" : ""
  }`;

  return (
    <li className="element">
      <img
        src={link}
        className="element__image"
        alt={name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__name">{name}</h2>
        <div className="element__like-counter">
          <button
            onClick={handleLike}
            className={cardLikeButtonClassName}
          ></button>
          <p className="element__like-count">{likes.length}</p>
        </div>
      </div>
      <button onClick={handleDelete} className={cardDeleteButtonClassName}>
        <img src={trashPath} className="element__trash" alt="trash" />
      </button>
    </li>
  );
}
export default Card;
