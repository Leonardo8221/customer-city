import { FC } from 'react';
import { styled, Box, Checkbox as MuiCheckbox } from '@mui/material';

import { ReactComponent as BoxChecked } from 'assets/icons/boxChecked.svg';
import { ReactComponent as BoxUnchecked } from 'assets/icons/boxUnchecked.svg';
import { ReactComponent as SortUpIcon } from 'assets/icons/triangleUp.svg';
import { ReactComponent as SortDownIcon } from 'assets/icons/triangleDown.svg';
import { ReactComponent as UnsortedIcon } from 'assets/icons/unsorted.svg';

export const Container = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
}));

const Checkbox = styled(MuiCheckbox)(() => ({
  padding: '0 10px 0 0',
}));

export const BaseCheckbox: FC<any> = (props) => {
  return <Checkbox {...props} icon={<BoxUnchecked />} checkedIcon={<BoxChecked />} />;
};

export const ColumnSortedAscendingIcon = () => {
  return <SortUpIcon className="sortup-icon" />;
};

export const ColumnSortedDescendingIcon = () => {
  return <SortDownIcon className="sortdown-icon" />;
};

export const ColumnUnsortedIcon = () => {
  return <UnsortedIcon />;
};
