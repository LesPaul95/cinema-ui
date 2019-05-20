import { observable, action, computed } from "mobx";

class FilterStore {
  @observable nowPlayingMovies;

  constructor() {
    this.nowPlayingMovies = {};
  }

  @action setNowPlayingMovies = nowPlaying => {
    this.nowPlayingMovies = nowPlaying;
  };
}

const filterStore = new FilterStore();

export default filterStore;
export { FilterStore };
