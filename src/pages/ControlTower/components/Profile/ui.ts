import { styled, Box, Button } from '@mui/material';

export const Container = styled(Box)(() => ({
  padding: 72,
  height: '100%',
}));

export const DetailContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
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

export const TextLinkButton = styled(Button)(({ theme }) => ({
  ...theme.typography.labelRegular12,
  padding: 0,
  height: 'fit-content',
  ':hover, :active': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

TextLinkButton.defaultProps = { variant: 'text' };
