import { FC } from 'react';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';

import theme from 'core/theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>CustomerCity</h1>
        <Button>Click me!</Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
