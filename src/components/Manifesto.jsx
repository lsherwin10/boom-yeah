import React from 'react';

import menInGlassesWithDrinks from '../assets/images/men in glasses with drinks.png';

const Manifesto = () => {
  return (
    <section className="manifesto">
      <div className="manifesto-image">
        <img src={menInGlassesWithDrinks} alt="Men with drinks and glasses" />
      </div>
      <div className="manifesto-content">
        <h2 className="manifesto-title">
          BUILT LOUD.
          <br />
          WORN LOUDER.
        </h2>
        <p className="manifesto-text">
          No safe choices. No quiet flexes. BOOM-YEAH! makes visual armor for
          the days you plan to leave a mark.
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
