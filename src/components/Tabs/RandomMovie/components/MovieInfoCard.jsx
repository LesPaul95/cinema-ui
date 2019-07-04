import React, { useEffect } from 'react';
// import moment from 'moment';
// import clsx from 'clsx';
import {
  // Card,
  // CardHeader,
  // CardMedia,
  // CardContent,
  // CardActions,
  Collapse,
  Avatar,
  // IconButton,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  cardHeader: {
    backgroundColor: '#3A2E39',
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
}));

export function MovieInfoCard({ movie, getGenresNamesByIds }) {
  const classes = useStyles();
  const cast = movie.cast || [];
  const [expanded, setExpanded] = React.useState(false);

  // function handleExpandClick() {
  //   setExpanded(!expanded);
  // }

  useEffect(() => setExpanded(false), [movie]);

  const width = document.getElementById('movieInfoGridContainer') && document.getElementById('movieInfoGridContainer').offsetWidth;

  return (
    <>
      <Paper>

        <Grid container justify="center" className={classes.cardHeader}>
          <Grid item xs={1}>
            <Avatar>{movie.vote_average}</Avatar>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body1" color="secondary" component="p">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {getGenresNamesByIds(movie.genre_ids)}
            </Typography>
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
                    <Avatar
                      className={classes.avatar}
                      alt=""
                      src={`https://image.tmdb.org/t/p/w500${man.profile_path}`}
                    />
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
      {/* <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
        />
        <div className={classes.info}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>{movie.vote_average}</Avatar>
            }
            title={movie.title}
            subheader={moment(movie.release_date).format('DD.MM.YYYY')}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {getGenresNamesByIds(movie.genre_ids)}
            </Typography>
          </CardContent>
          <CardContent>
            {cast.map(
              (man, index) => index < 15 && (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                key={man.id}
              >
                {man.name}
              </Typography>
              ),
            )}
          </CardContent>
          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
              disabled={!movie.overview}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </div>
      </Card> */}
      {!!movie.overview && (
        <>
          <br />
          <Grid container spacing={5} justify="center">
            <Grid item xs={12}>
              <Paper>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Typography paragraph>{movie.overview}</Typography>
                </Collapse>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
