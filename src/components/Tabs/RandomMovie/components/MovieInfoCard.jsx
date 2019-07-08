import React from 'react';
// import moment from 'moment';
// import clsx from 'clsx';
import {
  // Card,
  // CardHeader,
  // CardMedia,
  // CardContent,
  // CardActions,
  Avatar,
  // IconButton,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import StarsRating from 'stars-rating';
import { People, Movie } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  cardHeader: {
    backgroundColor: '#3A2E39',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    height: '3em',
  },
  cast: {
    margin: '5px',
  },
  overwiew: {
    margin: '1em',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: grey[500],
    margin: 'auto',
    width: 60,
    height: 60,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));

export function MovieInfoCard({ movie, getGenresNamesByIds }) {
  const classes = useStyles();
  const cast = movie.cast || [];

  const width = document.getElementById('movieInfoGridContainer') && document.getElementById('movieInfoGridContainer').offsetWidth;

  return (
    <>
      <Paper>

        <Grid container justify="center" alignItems="center" className={classes.cardHeader}>
          <Grid item xs={1}>
            <Movie color="secondary" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="secondary" component="p">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {getGenresNamesByIds(movie.genre_ids)}
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.rating}>
            <StarsRating
              count={5}
              edit={false}
              size={24}
              value={movie.vote_average / 2}
            />
            <span>{movie.vote_average}</span>
          </Grid>
        </Grid>

        <Grid container spacing={2} justify="center" id="movieInfoGridContainer">
          <Grid item xs={6}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              width={width / 2}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="center">
              {cast.map(
                (man, index) => index < 5 && (
                  <div key={man.id} className={classes.cast}>
                    {man.profile_path
                      ? (
                        <Avatar
                          className={classes.avatar}
                          src={`https://image.tmdb.org/t/p/w500${man.profile_path}`}
                        />
                      )
                      : (
                        <Avatar className={classes.avatar}>
                          <People />
                        </Avatar>
                      )}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {man.name}
                    </Typography>
                  </div>
                ),
              )}
            </Grid>
            <Grid container>
              <Typography variant="body2" color="textPrimary" component="p" className={classes.overwiew}>
                {movie.overview}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
