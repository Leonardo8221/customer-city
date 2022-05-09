import { styled, Button, Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material';

export const TextButton = styled(Button)<{ active?: boolean; textMarginRight?: number }>(
  ({ theme, active, textMarginRight }) => ({
    padding: 0,
    color: active ? theme.palette.neutral.white : theme.palette.neutral.n400,
    height: '100%',
    marginTop: 1,
    ':hover, :active': {
      color: theme.palette.neutral.white,
      backgroundColor: 'transparent',
    },
    '& .MuiButton-endIcon': {
      marginLeft: textMarginRight ?? 4,
      height: 8,
      width: 8,
    },
  }),
);

TextButton.defaultProps = { variant: 'text' };

export const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiList-root': {
    minWidth: 152,
    backgroundColor: theme.palette.neutral.darkBlueHigh,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

export const MenuItem = styled(MuiMenuItem)<{ active?: boolean }>(({ theme, active }) => ({
  ...theme.typography.labelRegular12,
  color: active ? theme.palette.neutral.white : theme.palette.neutral.n400,
  height: 32,
  padding: '8px 16px',
  ':hover': {
    backgroundColor: theme.palette.neutral.darkBlueMedium,
    color: theme.palette.neutral.white,
  },
}));
