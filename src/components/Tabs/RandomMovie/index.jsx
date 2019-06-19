// Tab on React Hooks
import React, { useState } from 'react';
import { random } from 'lodash';
import { Button, Grid, Typography } from '@material-ui/core';
import { getRandomMoviesList } from '../../../actions';
import { MultiplyGenresList } from './components/MultiplyGenresList';
import { MovieInfoCard } from './components/MovieInfoCard';
import { YearRange } from './components/YearRange';

function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

const minYear = 1970;
const currentYear = getCurrentYear();

export function RandomMovie() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([minYear, currentYear]);
  const [randomMovie, setRandomMovie] = useState(null);

  const handleFindMovie = async () => {
    const { results } = await getRandomMoviesList(yearRange);
    setRandomMovie(results[random(0, results.length - 1)]);
    console.log(randomMovie);
  };

  const handleYearRangeChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleMultiplyGenresListChange = (event) => {
    setSelectedGenres(event.target.value);
  };

  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <MultiplyGenresList
            selectedGenres={selectedGenres}
            handleMultiplyGenresListChange={handleMultiplyGenresListChange}
          />
        </Grid>
        <Grid item xs={6}>
          <YearRange
            yearRange={yearRange}
            handleYearRangeChange={handleYearRangeChange}
            minYear={minYear}
            maxYear={currentYear}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
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
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <MovieInfoCard movie={randomMovie} />
          </Grid>
        </Grid>
      )}
    </Typography>
  );
}
