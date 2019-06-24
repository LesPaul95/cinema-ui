import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 'auto',
  },
});

export function YearRange({
  yearRange, handleYearRangeChange, minYear, maxYear,
}) {
  const classes = useStyles();
  const marks = [
    {
      value: minYear,
      label: minYear,
    },
    {
      value: maxYear,
      label: maxYear,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Год издания
      </Typography>
      <Slider
        value={yearRange}
        onChange={handleYearRangeChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={minYear}
        max={maxYear}
        marks={marks}
      />
    </div>
  );
}
