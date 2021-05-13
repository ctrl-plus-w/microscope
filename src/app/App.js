import React, { useEffect, useState } from 'react';

// Libs
import gsap from 'gsap';

import { TweenLite } from 'gsap/all';
import { Draggable } from 'gsap/Draggable';

// Assets
import bcp from '../assets/img/bcp_490_x36';

import './App.css';

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
        {bcp.map((image, i, arr) => {
          /**
           *
           * On the images taken here, the set of images make a circle of 360deg, if the images only make 180deg of the circle
           * you will need to map through the images another time to make the last 180deg.
           *
           * Changes to make on this circumstances
           *   - The circle will be splitted in two, so the sectionDeg is not 360deg divided by the array length by 180deg.
           *   - An offset of 180deg on the second section should be added otherwise it will overlap.
           */

          const sectionDeg = 360 / arr.length;

          const sectionPercent = (rotation / sectionDeg) % 1;
          const index = Math.floor(rotation / sectionDeg);

          const curr = i === index;

          const getVisibility = () => {
            return curr ? 'visible' : 'hidden';
          };

          const getRotation = () => {
            return curr ? `rotate(${sectionPercent * sectionDeg}deg)` : '';
          };

          const style = {
            zIndex: 10 + i,
            visibility: getVisibility(),
            transform: getRotation(),
            opacity: 1,
          };

          return <img className={`img ${curr ? 'yes' : ''}`} style={{ ...style }} src={image} key={i} alt='' />;
        })}
      </div>
    </div>
  );
};

export default App;
