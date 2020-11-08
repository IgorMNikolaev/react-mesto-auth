import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, ...rest }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-cover">
        <input
          type="text"
          name="name"
          className="popup__input popup__input-name"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name}
        />
        <span className="popup__input-error"></span>
      </div>
      <div className="popup__input-cover">
        <input
          type="text"
          name="description"
          className="popup__input popup__input-description"
          required
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionChange}
          value={description}
        />
        <span className="popup__input-error"></span>
      </div>
      <button type="submit" className="popup__submit-button">
        Сохранить
      </button>
      <button className="popup__loading" disabled>
        <p className="popup__loading-text">Сохранение...</p>
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
