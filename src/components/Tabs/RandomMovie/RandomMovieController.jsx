// Tab on MobX
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RandomMovie } from './RandomMovie';

@inject('dictionariesStore')
@observer
export class RandomMovieController extends React.Component {
  render() {
    const { dictionariesStore: { genres, getGenresIdsByNames, getGenresNamesByIds } } = this.props;
    return (
      <RandomMovie
        genres={genres}
        getGenresIdsByNames={getGenresIdsByNames}
        getGenresNamesByIds={getGenresNamesByIds}
      />
    );
  }
}
