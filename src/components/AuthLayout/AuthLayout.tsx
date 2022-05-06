import { FC, ReactNode } from 'react';
import { Grid, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReactComponent as NavBackIcon } from 'assets/icons/navBack.svg';
import { ReactComponent as WhiteLogo } from 'assets/icons/whiteLogo.svg';
import { ReactComponent as CheckWhiteIcon } from 'assets/icons/checkWhite.svg';
import { publicRoutes } from 'router/routes';
import { noop } from 'core/utils';
import {
  Container,
  ContentContainer,
  ContentFooter,
  ContentHeader,
  IconButton,
  CenteredContainer,
  Divider,
  RollItem,
  GridContainer,
} from './ui';

interface AuthLayoutProps {
  children: ReactNode;
  backButtonEnabled?: boolean;
  onGoBack?: () => void;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, backButtonEnabled = false, onGoBack = noop }) => {
  return (
    <Container>
      <GridContainer container spacing={2}>
        <Grid item xs={12} md={6}>
          <ContentContainer>
            <ContentHeader>
              <Box>
                {backButtonEnabled && (
                  <>
                    <IconButton onClick={onGoBack}>
                      <NavBackIcon />
                    </IconButton>

                    <Typography variant="p12" sx={{ color: 'neutral.main' }}>
                      Back
                    </Typography>
                  </>
                )}
              </Box>

              <Typography variant="labelRegular12" textAlign="right" component="p" alignItems="center" display="flex">
                Don&apos;t have an account?&nbsp;
                <Link to={publicRoutes.login}>
                  <MuiLink style={{ textDecoration: 'none' }} component="span">
                    Sign up
                  </MuiLink>
                </Link>
              </Typography>
            </ContentHeader>

            <CenteredContainer flex="1">{children}</CenteredContainer>

            <ContentFooter>
              <Typography variant="labelRegular12" textAlign="center" component="p">
                © 2022 сustomercity.com, inc. All rights reserved. |{' '}
                <Link to={publicRoutes.login}>
                  <MuiLink style={{ textDecoration: 'none' }} component="span">
                    Privacy
                  </MuiLink>
                </Link>
              </Typography>
            </ContentFooter>
          </ContentContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <ContentContainer>
            <ContentHeader>
              <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.white' }}>
                Unified Revenue Operations Platform. The Future of Sales Technology for B2B SaaS Companies
              </Typography>

              <Divider />
            </ContentHeader>

            <CenteredContainer flex="1" style={{ marginTop: '-8rem' }}>
              <WhiteLogo width={248} height={40} />

              <CenteredContainer marginTop={5}>
                <RollItem opacity={0.33}>
                  <CheckWhiteIcon />
                  <Typography variant="p14">Analytics</Typography>
                </RollItem>
                <RollItem opacity={0.66}>
                  <CheckWhiteIcon />
                  <Typography variant="p14">Drag-and-drop editor</Typography>
                </RollItem>
                <RollItem opacity={1}>
                  <CheckWhiteIcon />
                  <Typography variant="p14">SEO recommendations</Typography>
                </RollItem>
                <RollItem opacity={0.66}>
                  <CheckWhiteIcon />
                  <Typography variant="p14">Programmable automation</Typography>
                </RollItem>
                <RollItem opacity={0.33}>
                  <CheckWhiteIcon />
                  <Typography variant="p14">Knowledge base</Typography>
                </RollItem>
              </CenteredContainer>
            </CenteredContainer>
          </ContentContainer>
        </Grid>
      </GridContainer>
    </Container>
  );
};

export default AuthLayout;
