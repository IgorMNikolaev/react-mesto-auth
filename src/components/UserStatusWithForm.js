import React from "react";

function UserStatusWithForm({ name, title, children, onSubmit, ...rest }) {
  return (
    <>
      <section className={`popup__status popup-${name}`}>
        <div className="popup__container_status">
          <h3 className="popup__title popup__title_white">{title}</h3>
          <form
            onSubmit={onSubmit}
            className={`popup__form popup__${name}-form`}
            noValidate
          >
            {children}
          </form>
        </div>
      </section>
    </>
  );
}

export default UserStatusWithForm;
