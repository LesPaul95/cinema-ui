import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import { observer, inject } from 'mobx-react';
import { Container } from '@material-ui/core/';
import { NowPlaying } from '../Tabs/NowPlaying';

@inject('moviesStore')

@observer
export class App extends React.Component {
  render() {
    return (
      <>
        <DevTools />
        <Container>
          <NowPlaying />
        </Container>
      </>
    );
  }
}
