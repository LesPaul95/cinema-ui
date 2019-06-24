// Tab on React Hooks
import React, { useState, useEffect } from 'react';
import { random } from 'lodash';
import { Button, Grid, Typography } from '@material-ui/core';
import { getRandomMoviesList } from '../../../actions';
import { MultipleGenresList } from './components/MultipleGenresList';
import { MovieInfoCard } from './components/MovieInfoCard';
import { YearRange } from './components/YearRange';
import { MultipleCountriesList } from './components/MultipleCountriesList';
import { VoteRange } from './components/VoteRange';

function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

const minYear = 1970;
const currentYear = getCurrentYear();

export function RandomMovie() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [yearRange, setYearRange] = useState([minYear, currentYear]);
  const [voteRange, setVoteRange] = useState([0, 10]);
  const [randomMovie, setRandomMovie] = useState(null);

  const handleFindMovie = async () => {
    const { results } = await getRandomMoviesList(yearRange);
    setRandomMovie(results[random(0, results.length - 1)]);
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
    <Typography component="div" style={{ padding: 8 * 3 }}>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <MultipleGenresList
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
        </Grid>
        <Grid item xs={4}>
          <VoteRange voteRange={voteRange} setVoteRange={setVoteRange} />
        </Grid>
        <Grid item xs={4}>
          <MultipleCountriesList
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
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
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={handleFindMovie}
          >
            НАЙТИ
          </Button>
        </Grid>
      </Grid>
      {randomMovie && (
        <Grid container spacing={5} justify="center">
          <Grid item xs={8}>
            <MovieInfoCard movie={randomMovie} />
          </Grid>
        </Grid>
      )}
    </Typography>
  );
}
