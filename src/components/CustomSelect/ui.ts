import { styled, Select as MuiSelect, MenuItem } from '@mui/material';

import { ReactComponent as SortDownIcon } from 'assets/icons/triangleDown.svg';

export const Select = styled(MuiSelect)(({ theme }) => ({
  ...theme.typography.p14,
  padding: '4px 8px',
  position: 'relative',
  '& svg': {
    marginTop: 2,
    right: 12,
    position: 'absolute',
  },
  ':before, :after': {
    borderWidth: '0px !important',
  },
  '& .MuiInput-input:focus': {
    backgroundColor: 'transparent',
  },
}));

Select.defaultProps = { variant: 'standard', IconComponent: SortDownIcon };

export const OptionItem = styled(MenuItem)(({ theme }) => ({
  ':hover': {
    backgroundColor: theme.palette.lightBg.main,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.neutral.white,
    color: theme.palette.primary.main,
    ':hover': {
      backgroundColor: theme.palette.neutral.white,
    },
  },
}));
