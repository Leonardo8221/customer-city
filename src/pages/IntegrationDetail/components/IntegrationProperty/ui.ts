import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container = styled(Box)(() => ({
  position: 'relative',
  flex: 5,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

export const BackToRoute = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  marginTop: 24,
  marginLeft: 24,
  gap: 12,
  color: 'black',
}));

export const ProfileHead = styled(Box)(() => ({
  display: 'flex',
  gap: 24,
  padding: '32px 24px',
  '& .profile-head': {
    width: '100%',
    '& .popover-wrapper': {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
  },
}));

export const PropertyContainer = styled(Box)(() => ({
  padding: 24,
  overflowY: 'auto',
  height: 'calc(100vh - 17rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));
