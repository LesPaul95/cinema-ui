import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import { withRouter, Link, Route } from 'react-router-dom';
import { NowPlaying } from '../Tabs/NowPlaying';
import { RandomMovie } from '../Tabs/RandomMovie';

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

const useStyles = makeStyles({
  root: {
    padding: '15px',
  },
});

const routesToTabs = Object.freeze({
  '/': 0,
  '/nowplaying': 1,
});

function HeaderController({ location }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(routesToTabs[location.pathname] || 0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <>
      <AppBar position="static" color="primary" variant="fullWidth" classes={classes}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          scrollButtons="auto"
          centered
        >
          <Tab label="Случайный фильм" component={Link} to="/" />
          <Tab label="В прокате" component={Link} to="/nowplaying" />
        </Tabs>
      </AppBar>
      <Route exact path="/" component={RandomMovie} />
      <Route exact path="/nowplaying" component={NowPlaying} />
    </>
  );
}

export const Header = withRouter(HeaderController);
