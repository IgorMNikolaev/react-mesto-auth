import React from "react";

function ImagePopup({ card, onClose, ...rest }) {
  return (
    <section
      className={`popup popup-image ${"name" in card ? "popup_opened" : ""}`}
    >
      <div className="popup__container-image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__name">{card.name}</h3>
        <button
          className="popup__close-button popup-image__close-button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
