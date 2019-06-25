import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import StarRate from '@material-ui/icons/StarRate';

const useStyles = makeStyles(theme => ({
  card: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    width: '50%',
    height: '510px',

  },
  info: {
    display: 'flex',
    flexDirection: 'column',
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

  return (
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
        <CardActions disableSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          {cast.map((man, index) => index < 8 && (
            <Typography variant="body2" color="textSecondary" component="p" key={man.id}>
              {man.name}
            </Typography>
          ))}
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{movie.overview}</Typography>
          </CardContent>
        </Collapse>
      </div>
    </Card>
  );
}
