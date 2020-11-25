import React, { useState } from 'react';

const HooksExample = () => {
  const [color, setState] = useState("Black");

  const changeColor = () => {
    setState("red");
  }

  return (
    <div>
      The color is {color}
      <div onClick={changeColor}>Click to change color</div>
    </div>
  )
}

export default HooksExample;
