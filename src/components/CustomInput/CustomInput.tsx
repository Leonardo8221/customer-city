import { FC } from 'react';
import { Box, InputLabel, TextField, OutlinedTextFieldProps } from '@mui/material';

interface CustomInputProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  name: string;
}

const CustomInput: FC<CustomInputProps> = ({ id, name, label, ...rest }) => {
  return (
    <Box>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1 }}>
          {label}
        </InputLabel>
      )}

      <TextField id={id} name={name} type="text" fullWidth {...rest} />
    </Box>
  );
};

CustomInput.defaultProps = { variant: 'outlined' };

export default CustomInput;
