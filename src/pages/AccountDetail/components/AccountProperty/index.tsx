import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useEffect, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyContainer } from './ui';
import format from 'date-fns/format';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as AccountRoundIcon } from 'assets/icons/accountRound.svg';
import { Divider, Typography } from '@mui/material';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { StyledDropDownPanel } from 'components/DropDownPanel';
import { useAccount } from 'store/account/hooks';
import { CustomSelect } from 'components/CustomSelect';
import {
  Account,
  ACCOUNT_INDUSTRY_OPTIONS,
  ACCOUNT_STAGE_OPTIONS,
  ACCOUNT_STATUS_OPTIONS,
  ACCOUNT_TYPE_OPTIONS,
} from 'store/account/types';
import { Loader } from 'components/Loader';

interface Props {
  accountId: number;
}

const AccountProperty: FC<Props> = ({ accountId }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { loading, error, account, getAccount, deleteAccount, updateAccount } = useAccount();

  useEffect(() => {
    getAccount(accountId);
  }, [accountId, getAccount]);

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleDelete = async () => {
    account && deleteAccount(account.accountId);
    toggleModalOpen();
    navigate(PRIVATE_ABS_ROUTE_PATHS.accounts);
  };

  const handleUpdate = (data: Partial<Account>) => {
    account && updateAccount({ accountId: account.accountId, data });
  };

  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.accounts}>
        <ArrowLeft />
        {'Back to Accounts'}
      </BackToRoute>
      <ProfileHead>
        <AccountRoundIcon />
        <div className="main-profile">
          <div className="main-profile-content">
            <Typography variant="p12">Name</Typography>
            <Typography variant="h3">{account?.accountName ?? ''}</Typography>
          </div>
          <PopoverWrapper icon={<DotsIcon />}>
            <DeleteButton startIcon={<DeleteIcon />} onClick={() => setModalOpen(true)}>
              {'Delete account'}
            </DeleteButton>
          </PopoverWrapper>
          <DeleteModal
            open={modalOpen}
            toggleOpen={toggleModalOpen}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            entity={'account'}
          />
        </div>
      </ProfileHead>
      <Divider />

      <PropertyContainer>
        <StyledDropDownPanel title={'Core Information'}>
          <TitleContainer label="Account Name">
            <Typography variant="p14">{account?.accountName ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Account Description">
            <Typography variant="p14">{account?.description ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Parent of">
            {/* <Typography variant="p14">{account?.accountParentOf ?? '-'}</Typography> */}
          </TitleContainer>

          <TitleContainer label="Child of">
            <Typography variant="p14">{account?.childOf ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Website">
            {/* <Typography variant="p14">{account?.accountWebSite ?? '-'}</Typography> */}
          </TitleContainer>

          <TitleContainer label="Account Revenue">
            <Typography variant="p14" sx={{ fontWeight: 600 }}>
              {account?.revenuePerYear ?? '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Industry">
            <CustomSelect<number>
              value={account?.industryId ?? 0}
              options={ACCOUNT_INDUSTRY_OPTIONS}
              onSelect={async (value) => handleUpdate({ industryId: value })}
            />
          </TitleContainer>

          <TitleContainer label="Primary Contact">
            {/* <Typography variant="p14">{account?.accountPrimaryContact ?? '-'}</Typography> */}
          </TitleContainer>

          <TitleContainer label="Account Stage">
            {/* <CustomSelect<string>
              value={account?.accountStage ?? '-'}
              options={ACCOUNT_STAGE_OPTIONS}
              onSelect={async (value) => handleUpdate({ accountStage: value })}
            /> */}
          </TitleContainer>

          <TitleContainer label="Account Status">
            {/* <CustomSelect<string>
              value={account?.accountStatus ?? '-'}
              options={ACCOUNT_STATUS_OPTIONS}
              onSelect={async (value) => handleUpdate({ accountStatus: value })}
            /> */}
          </TitleContainer>

          <TitleContainer label="Account Type">
            {/* <CustomSelect<string>
              value={account?.accountType ?? '-'}
              options={ACCOUNT_TYPE_OPTIONS}
              onSelect={async (value) => handleUpdate({ accountType: value })}
            /> */}
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'Billing Address'}>
          <TitleContainer label="Billing Street">
            <Typography variant="p14">{account?.contactInfo?.street ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing City">
            <Typography variant="p14">{account?.contactInfo?.city ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing State">
            <Typography variant="p14">{account?.contactInfo?.addressState ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing Country">
            <Typography variant="p14">{account?.contactInfo?.country ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing Zip Code">
            <Typography variant="p14">{account?.contactInfo?.zip ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'System Information'}>
          <TitleContainer label="Created Date">
            <Typography variant="p14">
              {account?.createDate ? format(new Date(account?.createDate), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated on">
            <Typography variant="p14">
              {/* {account?.accountUpdatedAt ? format(new Date(account?.accountUpdatedAt), 'PP') : '-'} */}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated by" icon="user">
            {/* <Typography variant="p14">{account?.accountModifiedBy ?? '-'}</Typography> */}
          </TitleContainer>
        </StyledDropDownPanel>
      </PropertyContainer>
      {loading && <Loader />}
    </Container>
  );
};

export default AccountProperty;
