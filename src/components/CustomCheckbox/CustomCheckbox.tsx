import { CSSProperties, FC } from 'react';
import { styled, Checkbox as MuiCheckbox, CheckboxProps, Box as MuiBox, Typography } from '@mui/material';

import { ReactComponent as BoxChecked } from 'assets/icons/boxChecked.svg';
import { ReactComponent as BoxUnchecked } from 'assets/icons/boxUnchecked.svg';

const Box = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const Checkbox = styled(MuiCheckbox)(() => ({
  padding: '0 10px 0 0',
}));

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  containerSyle?: CSSProperties;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ label, containerSyle, ...props }) => {
  return (
    <Box style={containerSyle}>
      <Checkbox {...props} icon={<BoxUnchecked />} checkedIcon={<BoxChecked />} />
      <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>
    </Box>
  );
};

export default CustomCheckbox;
