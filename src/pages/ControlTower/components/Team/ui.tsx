import { FC, Component } from 'react';
import { styled, Box, Checkbox as MuiCheckbox, Select as MuiSelect, Modal as MuiModal, alpha } from '@mui/material';

import { ReactComponent as BoxChecked } from 'assets/icons/boxChecked.svg';
import { ReactComponent as BoxUnchecked } from 'assets/icons/boxUnchecked.svg';
import { ReactComponent as SortUpIcon } from 'assets/icons/triangleUp.svg';
import { ReactComponent as SortDownIcon } from 'assets/icons/triangleDown.svg';
import { ReactComponent as UnsortedIcon } from 'assets/icons/unsorted.svg';

export const Container = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
}));

export const TopContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Checkbox = styled(MuiCheckbox)(() => ({
  padding: '0 10px 0 0',
}));

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

export const Modal = styled(MuiModal)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiBackdrop-root': {
    backgroundColor: alpha(theme.palette.neutral.darkBlueHigh as string, 0.2),
  },
}));

export const ModalContent = styled(Box)(({ theme }) => ({
  width: '70%',
  backgroundColor: theme.palette.neutral.white,
  padding: '16px 32px',
}));

export class BaseCheckbox extends Component {
  render() {
    return <Checkbox {...this.props} icon={<BoxUnchecked />} checkedIcon={<BoxChecked />} />;
  }
}

export const ColumnSortedAscendingIcon = () => {
  return <SortUpIcon className="sortup-icon" />;
};

export const ColumnSortedDescendingIcon = () => {
  return <SortDownIcon className="sortdown-icon" />;
};

export const ColumnUnsortedIcon = () => {
  return <UnsortedIcon />;
};
