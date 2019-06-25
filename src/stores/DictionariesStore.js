import { observable, action } from 'mobx';
import { sortBy } from 'lodash';
import { getGenresList } from '../actions';

class DictionariesStore {
  @observable genres;

  constructor() {
    this.genres = [];
  }

  @action fetchGenres = async () => {
    const { genres: genresResponse } = await getGenresList();
    this.setGenres(sortBy(genresResponse, ['name']) || []);
  };

  @action setGenres = (tmdbGenres) => {
    this.genres = tmdbGenres;
  };
}

export const dictionariesStore = new DictionariesStore();
