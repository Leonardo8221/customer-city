import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead } from './ui';
import format from 'date-fns/format';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as AccountRoundIcon } from 'assets/icons/accountRound.svg';
import { Divider, Typography } from '@mui/material';
import { deleteAccount as deleteAccountApi } from 'http/account';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Account } from 'store/account/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { StyledDropDownPanel } from 'components/DropDownPanel';

interface Props {
  account: Account | null;
}

const AccountProfile: FC<Props> = ({ account }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleDelete = async () => {
    setError(false);
    setLoading(true);
    try {
      account && (await deleteAccountApi(account?.accountId));
      toggleModalOpen();
      navigate(PRIVATE_ABS_ROUTE_PATHS.accounts);
    } catch (err) {
      setError((err as Error)?.message ?? true);
    }
    setLoading(false);
  };

  console.log('account', account);
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

      <div>
        <StyledDropDownPanel title={'Core Information'}>
          <TitleContainer label="Account Name">
            <Typography variant="p14">{account?.accountName ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Account Description">
            <Typography variant="p14">{account?.accountDescription ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Parent of">
            <Typography variant="p14">{account?.accountParentOf ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Child of">
            <Typography variant="p14">{account?.accountChildOf ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Website">
            <Typography variant="p14">{account?.accountWebSite ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Account Revenue">
            <Typography variant="p14" sx={{ fontWeight: 600 }}>
              {account?.accountRevenue ?? '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Industry">
            <Typography variant="p14">{account?.accountIndustry ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Primary Contact">
            <Typography variant="p14">{account?.accountPrimaryContact ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Account Stage">
            <Typography variant="p14">{account?.accountStage ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Account Type">
            <Typography variant="p14">{account?.accountType ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'Billing Address'}>
          <TitleContainer label="Billing Street">
            <Typography variant="p14">{account?.accountBillingStreet ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing City">
            <Typography variant="p14">{account?.accountBillingCity ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing State">
            <Typography variant="p14">{account?.accountBillingState ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing Country">
            <Typography variant="p14">{account?.accountBillingCountry ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing Zip Code">
            <Typography variant="p14">{account?.accountBillingZipCode ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'System Information'}>
          <TitleContainer label="Created Date">
            <Typography variant="p14">
              {account?.accountUpdatedAt ? format(new Date(account?.accountCreatedAt), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated on">
            <Typography variant="p14">
              {account?.accountUpdatedAt ? format(new Date(account?.accountUpdatedAt), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated by">
            <Typography variant="p14">{account?.accountModifiedBy ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>
      </div>
    </Container>
  );
};

export default AccountProfile;
