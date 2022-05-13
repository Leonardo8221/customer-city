import { styled, Box } from '@mui/material';

export const Container = styled(Box)(() => ({
  padding: 72,
  height: '100%',
}));

export const DetailContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
}));

export const DetailValueContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '& > div': {
    height: 16,
    width: 16,
    marginRight: 8,
    paddingTop: 1,
  },
}));
