import React, { useState, useEffect } from 'react';
import {
  Container, Fab, Grid, Typography, CircularProgress, makeStyles, Paper,
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, Search } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { MultipleGenresList } from './components/MultipleGenresList';
import { MovieInfoCard } from './components/MovieInfoCard';
import { YearRange } from './components/YearRange';
import { VoteRange } from './components/VoteRange';
import NoPoster from '../../../assets/no-poster.png';
import './RandomMovie.css';

function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

const minYear = 1970;
const currentYear = getCurrentYear();

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
  },
  fabSliders: {
    width: '100px',
    height: '100px',
    margin: 'auto',
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
});

export function RandomMovie({
  genres,
  getGenresIdsByNames,
  getGenresNamesByIds,
  currentMovie,
  setNextMovie,
  setPrevMovie,
  hasPrevMovie,
  hasNextMovie,
}) {
  const classes = useStyles();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [yearRange, setYearRange] = useState([
    minYear,
    currentYear,
  ]);
  const [voteRange, setVoteRange] = useState([0, 10]);

  const handleNextMovieButton = async () => {
    setIsLoading(true);
    const genresIds = getGenresIdsByNames(selectedGenres);
    await setNextMovie(yearRange, voteRange, genresIds);
    setIsLoading(false);
  };

  const handlePrevMovieButton = async () => {
    setPrevMovie();
  };

  const handleYearRangeChange = (event, newValue) => {
    setYearRange(newValue);
  };

  useEffect(() => {
    async function findFirstRandomMovie() {
      await handleNextMovieButton();
    }
    findFirstRandomMovie();
  }, []);

  return (
    <Container>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        <Grid container spacing={5} justify="center">
          <Grid item xs={10} md={5}>
            <MultipleGenresList
              genres={genres}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </Grid>
          <Grid item xs={10} md={5}>
            <VoteRange voteRange={voteRange} setVoteRange={setVoteRange} />
          </Grid>
        </Grid>
        <Grid container spacing={5} justify="center">
          <Grid item xs={10}>
            <YearRange
              yearRange={yearRange}
              handleYearRangeChange={handleYearRangeChange}
              minYear={minYear}
              maxYear={currentYear}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} justify="center" alignItems="center">
          <Grid item xs={6} md={2}>
            <div className={classes.root}>
              <Fab
                color="primary"
                className={classes.fabSliders}
                onClick={handlePrevMovieButton}
                disabled={!hasPrevMovie}
              >
                <ArrowBackIos fontSize="large" />
                Назад
              </Fab>
            </div>
          </Grid>
          <Grid item xs={12} md={8} className="movieInfoGrid">
            <Paper>
              {currentMovie && currentMovie.id ? (
                <MovieInfoCard
                  movie={currentMovie}
                  getGenresNamesByIds={getGenresNamesByIds}
                />
              ) : (
                <div className="noFound">
                  <img
                    src={NoPoster}
                    alt="Не найдено фильмов"
                    title="Не найдено фильмов"
                  />
                  <div>
                    Не найдено фильмов, попробойте изменить фильтры поиска
                  </div>
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={6} md={2}>
            <div className={classes.root}>
              <div className={classes.wrapper}>
                <Fab
                  color="primary"
                  className={classes.fabSliders}
                  onClick={handleNextMovieButton}
                  disabled={isLoading}
                >
                  {!hasNextMovie ? (
                    <>
                      Вперед
                      <ArrowForwardIos fontSize="large" />
                    </>
                  ) : (
                    <>
                      Найти
                      <Search fontSize="large" />
                    </>
                  )}
                </Fab>
                {isLoading && (
                  <CircularProgress
                    size={112}
                    className={classes.fabProgress}
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Typography>
    </Container>
  );
}
