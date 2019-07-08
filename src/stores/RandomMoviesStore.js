import { observable, action, computed } from 'mobx';
import { random } from 'lodash';
import { getRandomMoviesList, getMovieCastAndCrew } from '../actions';

class RandomMoviesStore {
  @observable nowPlayingMovies;

  @observable currentMovieIndex;

  @observable currentMovie;

  constructor() {
    this.randomMovies = [];
    this.currentMovieIndex = -1;
    this.currentMovie = null;
  }

  @action fetchNewMovie = async (yearRange, voteRange, genresIds) => {
    const { results } = await getRandomMoviesList(
      yearRange,
      voteRange,
      genresIds,
    );
    const randomMovieResponse = results[random(0, results.length - 1)];
    const castAndCrew = randomMovieResponse && randomMovieResponse.id
      ? await getMovieCastAndCrew(randomMovieResponse.id)
      : {};
    this.setNewMovie({ ...randomMovieResponse, ...castAndCrew });
  };

  @action setNewMovie = (movie) => {
    this.randomMovies.push(movie);
  };

  @action setCurrentMovieIndex = (index) => {
    this.currentMovieIndex = index;
  };

  @action setCurrentMovie = () => {
    this.currentMovie = this.randomMovies[this.currentMovieIndex];
  };

  @action setPrevMovie = () => {
    if (this.hasPrevMovie) {
      this.setCurrentMovieIndex(this.currentMovieIndex - 1);
    }
    this.setCurrentMovie();
  };

  @action setNextMovie = async (yearRange, voteRange, genresIds) => {
    if (this.hasNextMovie) {
      await this.fetchNewMovie(yearRange, voteRange, genresIds);
    }
    this.setCurrentMovieIndex(this.currentMovieIndex + 1);
    this.setCurrentMovie();
  };

  @computed get hasPrevMovie() {
    return this.currentMovieIndex > 0;
  }

  @computed get hasNextMovie() {
    return this.currentMovieIndex === this.randomMovies.length - 1 || this.currentMovieIndex === -1;
  }
}

export const randomMoviesStore = new RandomMoviesStore();
