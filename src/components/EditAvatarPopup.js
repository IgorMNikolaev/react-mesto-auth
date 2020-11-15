import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
  ...rest
}) {
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
      submitText="Сохранить"
      submitLoadText="Сохранение..."
      isLoading={isLoading}
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
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
