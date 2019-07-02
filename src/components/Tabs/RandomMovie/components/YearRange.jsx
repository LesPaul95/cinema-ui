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
      value: minYear + 10,
      label: minYear + 10,
    },
    {
      value: minYear + 20,
      label: minYear + 20,
    },
    {
      value: minYear + 30,
      label: minYear + 30,
    },
    {
      value: minYear + 40,
      label: minYear + 40,
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
