import React from 'react';
import queryString from 'querystring';
import { InfiniteScroll } from 'react-simple-infinite-scroll';
import { getPokemon, getPokemons } from '../api/pokemon';
import PokeListEntry from './PokeListEntry';
import LoadingGIF from '../Pokeeball.gif';
import './PokeList.scss';

export const SelectedId = React.createContext(null);

function PokeList() {
  // API calls
  const [isLoading, setIsLoading] = React.useState(false);
  const [previousOffset, setPreviousOffset] = React.useState(null);
  const [nextOffset, setNextOffset] = React.useState(0);
  const [pokemon, setPokemon] = React.useState([]);

  // App state
  const [selectedId, setSelectedId] = React.useState(null);

  React.useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);

    getPokemons(nextOffset).then(data => {
      if (data.next) {
        const params = queryString.parse(data.next.split('?')[1]);
        setNextOffset(params.offset);
      } else {
        setNextOffset(null);
      }

      Promise.all(
        data.results.map(pm => {
          const splitUrl = pm.url.split('/');
          const id = splitUrl[splitUrl.length - 2];
          return getPokemon(id);
        }),
      ).then(hydratedPokemon => {
        setIsLoading(false);
        setPokemon([...pokemon, ...hydratedPokemon]);
      });
    });
  }, [previousOffset]);

  const handlePokemonSelect = id => {
    if (!id) return;
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };
  // Have some infinite scroll that sets previousOffset = nextOffset
  return (
    <SelectedId.Provider value={selectedId}>
      <div className="PokeList">
        <InfiniteScroll
          throttle={100}
          threshold={500}
          isLoading={isLoading}
          hasMore={nextOffset}
          onLoadMore={() => setPreviousOffset(nextOffset)}
        >
          {pokemon.map(poke => (
            <PokeListEntry key={poke.id} pokemon={poke} onClick={handlePokemonSelect} />
          ))}
          {isLoading && (
            <div>
              <img src={LoadingGIF} alt="Loading..." height={150} />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </SelectedId.Provider>
  );
}

export default PokeList;
