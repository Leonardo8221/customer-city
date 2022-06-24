import { Divider, Typography } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { FC } from 'react';
import { AccountContainer } from './ui';

const AccountItem: FC = () => {
  return (
    <>
      <AccountContainer>
        <TitleContainer label="Account Name" icon="deal">
          <CustomSelect<string> value={'aronda'} options={[{ label: 'Aronda', value: 'aronda' }]} />
        </TitleContainer>
        <TitleContainer label="Office">
          <Typography variant="p14">{'Aronda Office - Albuquerque, NM, USA'}</Typography>
        </TitleContainer>
        <TitleContainer label="Department">
          <Typography variant="p14">{'Finace Department'}</Typography>
        </TitleContainer>
      </AccountContainer>
      <Divider />
    </>
  );
};

export default AccountItem;
