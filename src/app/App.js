import React, { useEffect, useState } from 'react';

// Libs
import gsap from 'gsap';

import { Draggable } from 'gsap/Draggable';

import bcp from '../assets/img/bcp_490_x36/index';

import './App.css';
import { TweenLite } from 'gsap/all';

gsap.registerPlugin(Draggable);

const App = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    Draggable.create('.wheel', {
      type: 'rotation',

      onDrag: function () {
        setRotation(this.rotation - 360 * Math.floor(this.rotation / 360));
      },
    });
  }, []);

  const reset = () => {
    TweenLite.to('.wheel', 0, {
      transform: '',
    });

    setRotation(0);
  };

  return (
    <div className='container'>
      <p>{Math.round(rotation)}deg</p>
      <button onClick={reset}>Reset</button>

      <div className='wheel'></div>

      <div className='lense'>
        {bcp.map((image, i) => {
          const sectionDeg = 360 / 35;

          const sectionPercent = (rotation / sectionDeg) % 1;
          const index = Math.floor(rotation / sectionDeg);

          const visible = i === index;

          const getVisibility = () => {
            return visible ? 'visible' : 'hidden';
          };

          const getRotation = () => {
            return visible ? `rotate(${sectionPercent * sectionDeg}deg)` : '';
          };

          const style = {
            zIndex: 10 + i,
            visibility: getVisibility(),
            transform: getRotation(),
            opacity: index + 1 === i ? 0 : 1,
          };

          return <img className='img' style={{ ...style }} src={image} key={i} alt='' />;
        })}
      </div>
    </div>
  );
};

export default App;
