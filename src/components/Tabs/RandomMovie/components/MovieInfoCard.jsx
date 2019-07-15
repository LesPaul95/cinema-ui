import React from 'react';
import moment from 'moment';
import {
  Avatar,
  Typography,
  Grid,
} from '@material-ui/core';
import StarsRating from 'stars-rating';
import { People, Movie } from '@material-ui/icons';
import NoPoster from '../../../../assets/no-poster.png';
import './MovieInfoCard.css';

export function MovieInfoCard({ movie, getGenresNamesByIds }) {
  const cast = movie.cast || [];

  return (
    <>

      <Grid container justify="center" alignItems="center" className="cardHeader">
        <Grid item xs={1} md={1} className="movieLogo">
          <Movie color="secondary" />
        </Grid>
        <Grid item xs={9} md={7}>
          <Typography variant="body1" color="secondary" component="p">
            {`${movie.title} (${moment(movie.release_date).format('DD.MM.YYYY')})`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {getGenresNamesByIds(movie.genre_ids)}
          </Typography>
        </Grid>
        <Grid item xs={2} md={4} className="rating">
          <StarsRating
            count={5}
            edit={false}
            size={24}
            value={movie.vote_average / 2}
          />
          <span className="ratingCount">{`${movie.vote_average}/10`}</span>
        </Grid>
      </Grid>

      <Grid container spacing={2} justify="center" id="movieInfoGridContainer">
        <Grid item xs={12} md={6}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : NoPoster}
            alt=""
            className="poster"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container justify="center">
            {cast.map(
              (man, index) => index < 5 && (
                <div key={man.id} className="cast">
                  {man.profile_path
                    ? (
                      <Avatar
                        className="avatar"
                        src={`https://image.tmdb.org/t/p/w500${man.profile_path}`}
                      />
                    )
                    : (
                      <Avatar className="avatar">
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
            <Typography variant="body2" color="textPrimary" component="p" className="overwiew">
              {movie.overview}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <div className="cardFooter" />
    </>
  );
}
