import axios from 'axios';
import { random } from 'lodash';

const themoviedbUri = 'https://api.themoviedb.org/3';

export const getNowPlaying = async (page) => {
  const { status, data } = await axios.get(
    `${themoviedbUri}/movie/now_playing?api_key=440220d48afb156283f60fe68cbb2920&language=ru-RU&page=${page}`,
  );
  return { status, ...data };
};

export const getRandomMoviesList = async (yearRange, voteRange, genres = '') => {
  try {
    const { status: firstStatus, data: firstData } = await axios.get(
      `${themoviedbUri}/discover/movie?api_key=440220d48afb156283f60fe68cbb2920&language=ru-RU
      &include_adult=true&page=${random(1, 1000)}&release_date.gte=${yearRange[0]}&release_date.lte=${yearRange[1]}
      &vote_average.gte=${voteRange[0]}&vote_average.lte=${voteRange[1]}&with_genres=${genres}`,
    );

    if (firstData.page > firstData.total_pages) {
      const { status, data } = await axios.get(
        `${themoviedbUri}/discover/movie?api_key=440220d48afb156283f60fe68cbb2920&language=ru-RU
        &include_adult=true&page=${random(1, firstData.total_pages)}&release_date.gte=${yearRange[0]}&release_date.lte=${yearRange[1]}
        &vote_average.gte=${voteRange[0]}&vote_average.lte=${voteRange[1]}&with_genres=${genres}`,
      );
      return { status, ...data };
    }

    return { status: firstStatus, ...firstData };
  } catch (e) {
    return e;
  }
};

export const getGenresList = async () => {
  const { status, data } = await axios.get(
    `${themoviedbUri}/genre/movie/list?api_key=440220d48afb156283f60fe68cbb2920&language=ru-RU`,
  );
  return { status, ...data };
};

export const getMovieCastAndCrew = async (movieId) => {
  const { data } = await axios.get(
    `${themoviedbUri}/movie/${movieId}/credits?api_key=440220d48afb156283f60fe68cbb2920`,
  );
  return data;
};
