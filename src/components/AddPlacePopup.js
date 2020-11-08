import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, ...rest }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleCardNameChange(e) {
    setName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-cover">
        <input
          type="text"
          name="name"
          className="popup__input popup__input_place"
          placeholder="Название"
          required
          maxLength="30"
          value={name}
          onChange={handleCardNameChange}
        />
        <span className="popup__input-error"></span>
      </div>
      <div className="popup__input-cover">
        <input
          type="url"
          name="image"
          className="popup__input popup__input_image"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleCardLinkChange}
        />
        <span className="popup__input-error"></span>
      </div>
      <button type="submit" className="popup__submit-button">
        Создать
      </button>
      <button className="popup__loading" disabled>
        <p className="popup__loading-text">Создание...</p>
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
