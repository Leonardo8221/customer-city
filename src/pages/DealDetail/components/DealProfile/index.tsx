import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyHead } from './ui';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as DealRoundIcon } from 'assets/icons/accountRound.svg';
import { Divider, Typography } from '@mui/material';
import { deleteDeal as deleteDealApi } from 'http/deal';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Deal } from 'store/deal/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';

interface Props {
  deal: Deal | null;
}

const DealProfile: FC<Props> = ({ deal }) => {
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
      deal && (await deleteDealApi(deal?.dealId));
      toggleModalOpen();
      navigate(PRIVATE_ABS_ROUTE_PATHS.dealScape);
    } catch (err) {
      setError((err as Error)?.message ?? true);
    }
    setLoading(false);
  };

  console.log('deal', deal);
  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.dealScape}>
        <ArrowLeft />
        {'Back to Deals'}
      </BackToRoute>
      <ProfileHead>
        <DealRoundIcon />
        <div className="main-profile">
          <div className="main-profile-content">
            <Typography variant="p12">Name</Typography>
            <Typography variant="h3">{deal?.dealName ?? ''}</Typography>
          </div>
          <PopoverWrapper icon={<DotsIcon />}>
            <DeleteButton startIcon={<DeleteIcon />} onClick={() => setModalOpen(true)}>
              {'Delete deal'}
            </DeleteButton>
          </PopoverWrapper>
          <DeleteModal
            open={modalOpen}
            toggleOpen={toggleModalOpen}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            entity={'deal'}
          />
        </div>
      </ProfileHead>
      <Divider />
      <PropertyHead>
        <Typography variant="h3">{'Properties'}</Typography>
      </PropertyHead>
      <TitleContainer label="Description">
        <Typography variant="p14">{deal?.dealDescription}</Typography>
      </TitleContainer>

      <Divider />
    </Container>
  );
};

export default DealProfile;
