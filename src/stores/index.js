import { observable, action } from 'mobx';
import { getNowPlaying } from '../actions';

class MoviesStore {
  @observable nowPlayingMovies;

  constructor() {
    this.nowPlayingMovies = {};
  }

  @action getNowPlayingMovies = async () => {
    const movies = await getNowPlaying();
    this.setNowPlayingMovies(movies);
  };

  @action setNowPlayingMovies = (nowPlaying) => {
    this.nowPlayingMovies = nowPlaying;
  };
}

export const moviesStore = new MoviesStore();
