import React from 'react';
import sortBy from 'lodash/sortBy';
import './PokeList.scss';

function PokeListEntry({ pokemon }) {
  return (
    <div className="PokeListEntry--container">
      <img src={pokemon.pic_url} alt="idk" />
      <div className="PokeListEntry--info">
        <div className="PokeListEntry--name">
          <span>{pokemon.name}</span>
          <sub>{pokemon.id}</sub>
        </div>
        <div className="PokeListEntry--types">
          {sortBy(pokemon.types, 'slot').map(type => (
            <div key={type.type.name} className={`PokeListEntry--type-pill ${type.type.name}`}>
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokeListEntry;
