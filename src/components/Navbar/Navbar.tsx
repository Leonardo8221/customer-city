import { FC } from 'react';
import { Toolbar, Typography } from '@mui/material';

import { AppBar, LeftContainer, RightContainer, Button } from './ui';

const Navbar: FC = () => {
  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <LeftContainer>
          <Typography variant="h6">Dashboard</Typography>
        </LeftContainer>

        <RightContainer>
          <Button
            onClick={() => {
              /** */
            }}
          >
            My account
          </Button>
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
