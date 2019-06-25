// Tab on MobX
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RandomMovie } from './RandomMovie';

@inject('dictionariesStore')
@observer
export class RandomMovieController extends React.Component {
  render() {
    const { dictionariesStore: { genres } } = this.props;
    return <RandomMovie genres={genres} />;
  }
}
