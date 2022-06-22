import { FC, ReactNode } from 'react';
import { InputLabel } from '@mui/material';

interface Props {
  children?: ReactNode;
  label?: string | ReactNode;
}

const CustomTextArea: FC<Props> = ({ label, children }) => {
  return (
    <div>
      {label && <InputLabel sx={{ marginBottom: 0.5 }}>{label}</InputLabel>}

      {children}
    </div>
  );
};

export default CustomTextArea;
