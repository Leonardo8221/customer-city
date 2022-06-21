import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyHead } from './ui';
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
      <PropertyHead>
        <Typography variant="h3">{'Properties'}</Typography>
      </PropertyHead>
      <TitleContainer label="Description">
        <Typography variant="p14">{account?.accountDescription}</Typography>
      </TitleContainer>

      <Divider />
    </Container>
  );
};

export default AccountProfile;
