import React from "react";

import success from "../images/success.png";
import fail from "../images/fail.png";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <>
      <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          {isSuccess ? (
            <>
              <img
                src={`${success}`}
                alt="Успех"
                className="popup__infotip-img"
              />
              <p className="popup__infotip-text">
                Вы успешно зарегистрировались!
              </p>
            </>
          ) : (
            <>
              <img
                src={`${fail}`}
                alt="Провал"
                className="popup__infotip-img"
              />
              <p className="popup__infotip-text">
                Что-то пошло не так. Попробуйте ещё раз!
              </p>
            </>
          )}
          <button className="popup__close-button" onClick={onClose}></button>
        </div>
      </section>
    </>
  );
}

export default InfoTooltip;
