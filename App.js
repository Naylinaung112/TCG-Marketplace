import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/redux/store';
import Navigation from './src/navigation';

const App = () => {
  return (
    <StoreProvider store={store}>
      <Navigation />
    </StoreProvider>
  );
};

export default App;
