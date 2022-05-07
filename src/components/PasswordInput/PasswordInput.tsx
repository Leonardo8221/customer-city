import { FC, useState } from 'react';
import { InputAdornment, IconButton, TextFieldProps } from '@mui/material';
import { Input } from 'components/ui';

import { ReactComponent as EyeHideIcon } from 'assets/icons/eyeHide.svg';
import { ReactComponent as EyeShowIcon } from 'assets/icons/eyeShow.svg';

const PasswordInput: FC<TextFieldProps> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisible((prevState) => !prevState)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {visible ? <EyeHideIcon /> : <EyeShowIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
