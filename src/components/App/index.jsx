import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Header } from '../Header';

const DevTools = React.lazy(() => (process.env.NODE_ENV === 'production'
  ? Promise.resolve({ default: () => null })
  : import('mobx-react-devtools')));

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
        <React.Suspense fallback={null}>
          <DevTools />
        </React.Suspense>
        <Header />
      </>
    );
  }
}
