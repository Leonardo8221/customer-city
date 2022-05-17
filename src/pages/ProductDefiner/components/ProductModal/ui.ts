import { styled, Box } from '@mui/material';

export const PriceCurrencyContainer = styled(Box)(() => ({
  display: 'flex',
  '& > div': {
    flex: 1,
    ':first-child': {
      '& .MuiTextField-root fieldset': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
      },
    },
    ':last-child': {
      '& .MuiTextField-root fieldset': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  },
}));
