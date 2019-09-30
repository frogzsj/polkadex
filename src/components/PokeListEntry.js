import React from 'react';
import { SlideDown } from 'react-slidedown';
import classnames from 'classnames';
import sortBy from 'lodash/sortBy';
import TypePill from './TypePill';
import { SelectedId } from './PokeList';
import './PokeList.scss';
import 'react-slidedown/lib/slidedown.css';

function PokeListEntry({ pokemon, onClick }) {
  return (
    <SelectedId.Consumer>
      {selectedId => {
        const isSelected = selectedId === pokemon.id;
        return (
          <div
            className={classnames('PokeListEntry--container', {
              'PokeListEntry--active': selectedId === pokemon.id,
            })}
            onClick={() => onClick(pokemon.id)}
          >
            <SlideDown>
              <div className="PokeListEntry--main">
                <img src={pokemon.pic_url} alt="idk" />
                <div className="PokeListEntry--info">
                  <div className="PokeListEntry--name">
                    <span>{pokemon.name}</span>
                    <sub>{pokemon.id}</sub>
                  </div>
                  <div className="PokeListEntry--types">
                    {sortBy(pokemon.types, 'slot').map(type => (
                      <TypePill key={type.type.name} type={type.type.name} />
                    ))}
                  </div>
                </div>
              </div>
              {isSelected && <div className="PokeListEntry--extra">{JSON.stringify(pokemon)}</div>}
            </SlideDown>
          </div>
        );
      }}
    </SelectedId.Consumer>
  );
}

export default PokeListEntry;
