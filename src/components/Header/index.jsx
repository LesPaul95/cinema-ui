import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core/';
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

const styles = {
  paperContainer: {
    backgroundColor: '#240B05',
    padding: '10px',
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const routesToTabs = Object.freeze({
  '/': 0,
  '/random-movie': 1,
});

function ScrollableTabsButtonController({ location }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(routesToTabs[location.pathname] || 0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Paper style={styles.paperContainer} />
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          centered
        >
          <Tab label="В прокате" component={Link} to="/" />
          <Tab label="Случайный фильм" component={Link} to="/random-movie" />
        </Tabs>
      </AppBar>
      <Route exact path="/" component={NowPlaying} />
      <Route path="/random-movie" component={RandomMovie} />
    </div>
  );
}

export const ScrollableTabsButtonAuto = withRouter(ScrollableTabsButtonController);
