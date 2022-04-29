import { FC } from 'react';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { Provider } from 'react-redux';

import theme from 'core/theme';
import { store } from 'store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <h1>CustomerCity</h1>
          <Button>Click me!</Button>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
