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

export function VoteRange({ voteRange, setVoteRange }) {
  const classes = useStyles();
  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    },
    {
      value: 6,
      label: 6,
    },
    {
      value: 7,
      label: 7,
    },
    {
      value: 8,
      label: 8,
    },
    {
      value: 9,
      label: 9,
    },
    {
      value: 10,
      label: 10,
    },
  ];

  const handleChange = (event, newValue) => {
    setVoteRange(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Оценка
      </Typography>
      <Slider
        value={voteRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={10}
        marks={marks}
      />
    </div>
  );
}
