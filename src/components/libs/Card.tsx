import React, { useState } from "react";

function Card() {
  const [counter, setCounter] = useState(0);
  function handleClick() {
    setCounter((counter) => counter + 1);
  }
  return (
    <div className="w-full p-5 bg-slate-300 text-white text-xl text-center">
      counter : {counter}
      <button onClick={handleClick}>count</button>
    </div>
  );
}

export default Card;
