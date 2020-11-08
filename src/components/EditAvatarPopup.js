import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, ...rest }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(avatarRef.current.value);
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-cover">
        <input
          type="url"
          name="image"
          className="popup__input popup__input_image"
          placeholder="Ссылка на новый аватар"
          required
          ref={avatarRef}
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

export default EditAvatarPopup;
