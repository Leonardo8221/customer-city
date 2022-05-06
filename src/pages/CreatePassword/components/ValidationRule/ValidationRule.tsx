import { FC } from 'react';
import { styled, Box as MuiBox, Typography as MuiTypography } from '@mui/material';

import { ReactComponent as CircleCheckedIcon } from 'assets/icons/circleChecked.svg';
import { ReactComponent as CircleUncheckedIcon } from 'assets/icons/circleUnchecked.svg';

const Container = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

const CicleCheckContainer = styled(MuiBox)<{ checked: boolean }>(({ checked }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: checked ? -2 : 0,
  marginRight: checked ? 8 : 10,
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.neutral.n400,
}));

interface ValidationRuleProps {
  label: string;
  checked: boolean;
}

const ValidationRule: FC<ValidationRuleProps> = ({ label, checked }) => {
  return (
    <Container>
      <CicleCheckContainer checked={checked}>
        {checked ? <CircleCheckedIcon /> : <CircleUncheckedIcon />}
      </CicleCheckContainer>
      <Typography variant="p14">{label}</Typography>
    </Container>
  );
};

export default ValidationRule;
