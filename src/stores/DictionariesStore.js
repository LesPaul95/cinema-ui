import { observable, action } from 'mobx';
import {
  sortBy, find, get, map,
} from 'lodash';
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

  @action getGenresIdsByNames = genresNames => map(genresNames, gName => get(find(this.genres, { name: gName }), 'id')).join(',');

  @action getGenresNamesByIds = genresIds => map(genresIds, gId => get(find(this.genres, { id: gId }), 'name')).join(', ');
}

export const dictionariesStore = new DictionariesStore();
