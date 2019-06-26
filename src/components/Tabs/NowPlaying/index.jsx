// Tab on MobX
import * as React from 'react';
import { get } from 'lodash';
import { observer, inject } from 'mobx-react';
import {
  Paper,
  TablePagination,
  Container,
  Typography,
} from '@material-ui/core/';
import { NowPlayingInfoTable } from './components/NowPlayingInfoTable';

@inject('moviesStore')
@observer
export class NowPlaying extends React.Component {
  componentDidMount() {
    const { moviesStore } = this.props;
    if (get(moviesStore, 'nowPlayingMovies.status') !== 200) {
      moviesStore.getNowPlayingMovies();
    }
  }

  handleChangePage = (_, pageNumber) => {
    const { moviesStore } = this.props;
    moviesStore.getNowPlayingMovies(pageNumber + 1);
  };

  render() {
    const { moviesStore: { nowPlayingMovies } } = this.props;
    return (
      <Container>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {nowPlayingMovies.status === 200 && (
            <Paper>
              <NowPlayingInfoTable results={nowPlayingMovies.results} />
              <TablePagination
                component="div"
                rowsPerPageOptions={[0]}
                count={nowPlayingMovies.total_results}
                rowsPerPage={nowPlayingMovies.results.length}
                page={nowPlayingMovies.page - 1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
              />
            </Paper>
          )}
        </Typography>
      </Container>
    );
  }
}
