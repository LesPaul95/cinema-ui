import React, { useEffect } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  card: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    width: '50%',
    height: '570px',

  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
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
    backgroundColor: red[500],
  },
}));

export function MovieInfoCard({ movie, getGenresNamesByIds }) {
  const classes = useStyles();
  const cast = movie.cast || [];
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  useEffect(() => setExpanded(false), [movie]);

  return (
    <>
      <Card className={classes.card}>
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
      </Card>
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
