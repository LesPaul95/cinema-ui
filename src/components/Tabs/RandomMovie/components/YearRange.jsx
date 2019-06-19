import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export function YearRange({
  yearRange, handleYearRangeChange, minYear, maxYear,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Год издания
      </Typography>
      <Slider
        value={yearRange}
        onChange={handleYearRangeChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        min={minYear}
        max={maxYear}
      />
    </div>
  );
}
