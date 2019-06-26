// Tab on React Hooks
import React, { useState, useEffect } from 'react';
import { random } from 'lodash';
import {
  Button, Container, Grid, Typography, CircularProgress, makeStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { getRandomMoviesList, getMovieCastAndCrew } from '../../../actions';
import { MultipleGenresList } from './components/MultipleGenresList';
import { MovieInfoCard } from './components/MovieInfoCard';
import { YearRange } from './components/YearRange';
import { VoteRange } from './components/VoteRange';

function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

const minYear = 1970;
const currentYear = getCurrentYear();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    right: '5px',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export function RandomMovie({ genres, getGenresIdsByNames, getGenresNamesByIds }) {
  const classes = useStyles();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [yearRange, setYearRange] = useState([minYear, currentYear]);
  const [voteRange, setVoteRange] = useState([0, 10]);
  const [randomMovie, setRandomMovie] = useState(null);

  const handleFindMovie = async () => {
    setIsLoading(true);
    const genresIds = getGenresIdsByNames(selectedGenres);
    const { results } = await getRandomMoviesList(yearRange, voteRange, genresIds);
    const randomMovieResponse = results[random(0, results.length - 1)];
    const castAndCrew = await getMovieCastAndCrew(randomMovieResponse.id);
    console.log({ ...randomMovieResponse, ...castAndCrew });
    setRandomMovie({ ...randomMovieResponse, ...castAndCrew });
    setIsLoading(false);
  };

  const handleYearRangeChange = (event, newValue) => {
    setYearRange(newValue);
  };

  useEffect(() => {
    async function findFirstRandomMovie() {
      await handleFindMovie();
    }
    findFirstRandomMovie();
  }, []);

  return (
    <Container>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        <Grid container spacing={10} justify="center">
          <Grid item xs={5}>
            <MultipleGenresList
              genres={genres}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </Grid>
          <Grid item xs={5}>
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
        <Grid container spacing={5} justify="center">
          <Grid item xs={8}>
            <div className={classes.wrapper}>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                onClick={handleFindMovie}
                disabled={isLoading}
              >
                НАЙТИ
              </Button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
        {randomMovie && (
          <Grid container spacing={5} justify="center">
            <Grid item xs={8}>
              <MovieInfoCard
                movie={randomMovie}
                getGenresNamesByIds={getGenresNamesByIds}
              />
            </Grid>
          </Grid>
        )}
      </Typography>
    </Container>
  );
}
