import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import { observer, inject } from 'mobx-react';
import { ScrollableTabsButtonAuto } from '../Header';

@inject('moviesStore')
@inject('dictionariesStore')
@observer
export class App extends React.Component {
  componentDidMount() {
    const { dictionariesStore } = this.props;
    dictionariesStore.fetchGenres();
  }

  render() {
    return (
      <>
        <DevTools />
        <ScrollableTabsButtonAuto />
      </>
    );
  }
}
