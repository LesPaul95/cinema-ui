// Tab on MobX
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RandomMovie } from './RandomMovie';

@inject('dictionariesStore', 'randomMoviesStore')
@observer
export class RandomMovieController extends React.Component {
  render() {
    const {
      dictionariesStore: {
        genres,
        getGenresIdsByNames,
        getGenresNamesByIds,
      },
      randomMoviesStore: {
        currentMovie,
        setPrevMovie,
        setNextMovie,
        hasPrevMovie,
        hasNextMovie,
      },
    } = this.props;
    return (
      <RandomMovie
        genres={genres}
        getGenresIdsByNames={getGenresIdsByNames}
        getGenresNamesByIds={getGenresNamesByIds}
        currentMovie={currentMovie}
        setPrevMovie={setPrevMovie}
        setNextMovie={setNextMovie}
        hasPrevMovie={hasPrevMovie}
        hasNextMovie={hasNextMovie}
      />
    );
  }
}
