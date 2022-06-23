import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useEffect, useState } from 'react';
import format from 'date-fns/format';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyContainer } from './ui';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as DealRoundIcon } from 'assets/icons/accountRound.svg';
import { Divider, Typography } from '@mui/material';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Deal, DEAL_STAGE_OPTIONS } from 'store/deal/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { CustomSelect } from 'components/CustomSelect';
import StageBar from 'components/StageBar';
import { StyledDropDownPanel } from 'components/DropDownPanel';
import { useDeal } from 'store/deal/hooks';
import { Loader } from 'components/Loader';

interface Props {
  dealId: number;
}

const DealProperty: FC<Props> = ({ dealId }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { loading, error, deal, getDeal, deleteDeal, updateDeal } = useDeal();

  useEffect(() => {
    getDeal(Number(dealId));
  }, [dealId, getDeal]);

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleDelete = async () => {
    deal && deleteDeal(deal.dealId);
    toggleModalOpen();
    navigate(PRIVATE_ABS_ROUTE_PATHS.dealScape);
  };

  const handleUpdate = (data: Partial<Deal>) => {
    deal && updateDeal({ dealId: deal.dealId, data });
  };

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
      <PropertyContainer>
        <TitleContainer label="Stage">
          <CustomSelect<string>
            value={deal?.dealStage ?? '-'}
            options={DEAL_STAGE_OPTIONS}
            sx={{
              '& .MuiSelect-select': {
                padding: 0,
              },
            }}
            onSelect={async (value) => handleUpdate({ dealStage: value })}
          />
          <StageBar stage={4} />
        </TitleContainer>
        <StyledDropDownPanel title={'Core Information'}>
          <TitleContainer label="Deam Name">
            <Typography variant="p14">{deal?.dealName ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Account Name">
            <Typography variant="p14">{deal?.dealAccountName ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Description">
            <Typography variant="p14">{deal?.dealDescription ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Amount">
            <Typography variant="p14" sx={{ fontFamily: 600 }}>
              {deal?.dealAmount ?? '-'}
            </Typography>
          </TitleContainer>
          <TitleContainer label="Company Name">
            <Typography variant="p14">{deal?.dealCampaignName ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Close Date">
            <Typography variant="p14">
              {deal?.dealCloseDate ? format(new Date(deal?.dealCloseDate), 'PP') : '-'}
            </Typography>
          </TitleContainer>
          <TitleContainer label="Contact Name">
            <Typography variant="p14">{deal?.dealContactName ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Forecast category">
            <Typography variant="p14">{deal?.dealForecastCategory ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Deal Type">
            <Typography variant="p14">{deal?.dealType ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Owner">
            <Typography variant="p14">{deal?.dealOwner ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Pipeline">
            <Typography variant="p14">{deal?.dealPipelineName ?? '-'}</Typography>
          </TitleContainer>
          <TitleContainer label="Touchpoint">
            <Typography variant="p14">{deal?.dealTouchPoint ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'System Information'}>
          <TitleContainer label="Created Date">
            <Typography variant="p14">
              {deal?.dealUpdatedAt ? format(new Date(deal?.dealCreatedAt), 'MM/dd/yyyy') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated on">
            <Typography variant="p14">
              {deal?.dealUpdatedAt ? format(new Date(deal?.dealUpdatedAt), 'MM/dd/yyyy, hh:mm aa') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated by">
            <Typography variant="p14">{deal?.dealModifiedBy ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>
      </PropertyContainer>
      {loading && <Loader />}
    </Container>
  );
};

export default DealProperty;
