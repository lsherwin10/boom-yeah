import React from 'react';

const Manifesto = () => {
  return (
    <section className="manifesto">
      <div className="manifesto-image">
        <img src="src/assets/images/shirt man.png" />
      </div>
      <div className="manifesto-content">
        {/* <span className="badge-outline" style={{ alignSelf: 'flex-start' }}>OUR MANIFESTO</span> */}
        {/* <span className="section-label" style={{ marginTop: '2rem' }}>02 / THE ATTITUDE</span> */}
        <h2 className="manifesto-title">BUILT LOUD.<br/>WORN LOUDER.</h2>
        <p className="manifesto-text">
          No safe choices. No quiet flexes. Boom-Yeah! makes visual armor for the days you plan to leave a mark.
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
