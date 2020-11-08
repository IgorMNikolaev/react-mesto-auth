import React from "react";

function Fourth({first, second, third} ) {
  return (
    <>
      <button onClick={first} className="button_box">Первый</button>
      <button onClick={second} className="button_box">Второй</button>
      <button onClick={third} className="button_box">Третий</button>
    </>
  );
}

export default Fourth;
