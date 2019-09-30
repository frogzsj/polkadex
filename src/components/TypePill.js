import React from 'react';
import './TypePill.scss';

function TypePill({ type }) {
  return <div className={`PokeListEntry--type-pill ${type}`}>{type}</div>;
}

export default TypePill;
