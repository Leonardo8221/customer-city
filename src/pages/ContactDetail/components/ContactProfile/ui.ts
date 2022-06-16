import { styled, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container = styled(Box)(() => ({
  width: 400,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));

export const BackToRoute = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  gap: 12,
  color: 'black',
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  fontWeight: 400,
  color: '#FB4E6D',
  padding: '0 16px',
  '&:hover': {
    color: '#FB4E6D',
    backgroundColor: '#00000005',
  },

  '& svg': {
    '& path:last-child,rect': {
      stroke: '#FB4E6D',
    },
    '& path:first-of-type': {
      fill: '#FB4E6D',
    },
  },
}));
export const PropertyHead = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ProfileHead = styled(Box)(() => ({
  display: 'flex',
  gap: 24,
  '& .main-profile': {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    '&-content': {
      padding: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
  },
}));
