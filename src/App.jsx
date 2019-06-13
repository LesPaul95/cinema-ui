import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core/';
import './App.css';

@observer
export class App extends React.Component {
  onMoviesSearch = () => {
    console.log(this.props);
    this.props.moviesStore.getNowPlayingMovies(); //eslint-disable-line
    // console.log(getNowPlaying());
  };

  render() {
    return (
      <div className="App">
        <DevTools />
        <Button
          variant="contained"
          color="primary"
          onClick={this.onMoviesSearch}
        >
          first button
        </Button>
      </div>
    );
  }
}
