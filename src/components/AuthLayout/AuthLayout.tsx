import { FC, ReactNode } from 'react';
import { Grid, Typography, Box, Link as MuiLink, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import './AuthLayout.css';

import { ReactComponent as NavBackIcon } from 'assets/icons/navBack.svg';
import { ReactComponent as WhiteLogo } from 'assets/icons/whiteLogo.svg';
import { ReactComponent as CheckWhiteIcon } from 'assets/icons/checkWhite.svg';
import { publicRoutes } from 'router/routes';
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

const features = [
  'Analytics',
  'Drag-and-drop editor',
  'SEO recommendations',
  'Programmable automation',
  'Knowledge base',
  'Marketing automation',
  'Lead generation',
  'Advanced CRM',
];

interface AuthLayoutProps {
  children: ReactNode;
  backButtonEnabled?: boolean;
  onGoBack?: () => void;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, backButtonEnabled = false, onGoBack }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  const handleGoBack = () => {
    if (onGoBack) onGoBack();
    else navigate(-1);
  };

  return (
    <Container>
      <GridContainer container spacing={2}>
        <Grid item xs={12} md={6}>
          <ContentContainer>
            <ContentHeader>
              <Box>
                {backButtonEnabled && (
                  <>
                    <IconButton onClick={handleGoBack}>
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

            <CenteredContainer flex="1">
              {smallDevice && (
                <Box marginBottom={5}>
                  <WhiteLogo width={248} height={40} />
                </Box>
              )}

              {children}
            </CenteredContainer>

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

        {!smallDevice && (
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
                  <Slider
                    vertical
                    autoplay
                    infinite
                    slidesToShow={5}
                    slidesToScroll={1}
                    className="cc_carousel-container"
                    arrows={false}
                    dots={false}
                  >
                    {features.map((feat) => {
                      return (
                        <RollItem key={feat}>
                          <CheckWhiteIcon />
                          <Typography variant="p14">{feat}</Typography>
                        </RollItem>
                      );
                    })}
                  </Slider>
                </CenteredContainer>
              </CenteredContainer>
            </ContentContainer>
          </Grid>
        )}
      </GridContainer>
    </Container>
  );
};

export default AuthLayout;
