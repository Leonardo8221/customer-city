import { FC, ReactNode } from 'react';
import { InputLabel } from '@mui/material';

interface Props {
  children?: ReactNode;
  label?: string | ReactNode;
}

const CustomTextArea: FC<Props> = ({ label, children }) => {
  return (
    <div>
      {label && <InputLabel sx={{ marginBottom: 1 }}>{label}</InputLabel>}

      {children}
    </div>
  );
};

export default CustomTextArea;
