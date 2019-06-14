import axios from 'axios';

export const getNowPlaying = async (page) => {
  const { status, data } = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=440220d48afb156283f60fe68cbb2920&language=ru-RU&page=${page}`,
  );
  return { status, ...data };
};
