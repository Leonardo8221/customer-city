import { FC } from 'react';
import { InputLabel, TextField, OutlinedTextFieldProps, SxProps, Theme } from '@mui/material';

interface CustomInputProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  name: string;
  labelSx?: SxProps<Theme>;
}

const CustomInput: FC<CustomInputProps> = ({ id, name, label, labelSx = {}, ...rest }) => {
  return (
    <div>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1, ...labelSx }}>
          {label}
        </InputLabel>
      )}

      <TextField id={id} name={name} type="text" {...rest} sx={{ backgroundColor: 'white' }} />
    </div>
  );
};

CustomInput.defaultProps = { variant: 'outlined' };

export default CustomInput;
