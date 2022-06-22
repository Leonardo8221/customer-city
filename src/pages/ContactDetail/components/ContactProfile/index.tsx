import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead } from './ui';
import format from 'date-fns/format';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as ContactAvatarIcon } from 'assets/icons/contactAvatar.svg';
import { Divider, Typography } from '@mui/material';
import { deleteContact as deleteContactApi } from 'http/contact';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Contact } from 'store/contact/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { SecondaryButton } from 'components/ui';
import { StyledDropDownPanel } from 'components/DropDownPanel';

interface Props {
  contact: Contact | null;
}

const ContactProfile: FC<Props> = ({ contact }) => {
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
      contact && (await deleteContactApi(contact?.contactId));
      toggleModalOpen();
      navigate(PRIVATE_ABS_ROUTE_PATHS.contacts);
    } catch (err) {
      setError((err as Error)?.message ?? true);
    }
    setLoading(false);
  };

  console.log('contact', contact);
  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.contacts}>
        <ArrowLeft />
        {'Back to Contacts'}
      </BackToRoute>
      <ProfileHead>
        <ContactAvatarIcon />
        <div className="main-profile">
          <div className="main-profile-content">
            <Typography variant="p12">Name</Typography>
            <Typography variant="h3">
              {contact?.contactFirstName ?? ''} {contact?.contactLastName ?? ''}
            </Typography>
          </div>
          <PopoverWrapper icon={<DotsIcon />}>
            <DeleteButton startIcon={<DeleteIcon />} onClick={() => setModalOpen(true)}>
              {'Delete contact'}
            </DeleteButton>
          </PopoverWrapper>
          <DeleteModal
            open={modalOpen}
            toggleOpen={toggleModalOpen}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            entity={'contact'}
          />
        </div>
      </ProfileHead>

      <Divider />

      <div>
        <StyledDropDownPanel title={'Core Information'}>
          <TitleContainer label="First Name">
            <Typography variant="p14">{contact?.contactFirstName ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Middle Name">
            <Typography variant="p14">{contact?.contactMiddleName ?? '-' ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Last Name">
            <Typography variant="p14">{contact?.contactLastName ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Account Name">
            <Typography variant="p14">{contact?.contactAssociate ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Title">
            <Typography variant="p14">{contact?.contactTitle ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Role">
            <Typography variant="p14">{contact?.contactRole ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Contact Type">
            <Typography variant="p14">{contact?.contactType ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Contact Status">
            <Typography variant="p14">{contact?.contactStatus ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Contact Stage">
            <Typography variant="p14">{contact?.contactStage ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'Contact Information'}>
          <TitleContainer label="Primary Email">
            <Typography variant="p14">{contact?.contactPrimaryEmail ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Secondary Email">
            <Typography variant="p14">{contact?.contactSecondaryEmail ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Phone Number">
            <Typography variant="p14">{contact?.contactPhoneNumber ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Mobile Number">
            <Typography variant="p14">{contact?.contactMobileNumber ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'Address'}>
          <TitleContainer label="Street">
            <Typography variant="p14">{contact?.contactStreet ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="City">
            <Typography variant="p14">{contact?.contactCity ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="State">
            <Typography variant="p14">{contact?.contactState ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Country">
            <Typography variant="p14">{contact?.contactCountry ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Zip Code">
            <Typography variant="p14">{contact?.contactZipCode ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'System Information'}>
          <TitleContainer label="Created Date">
            <Typography variant="p14">
              {contact?.contactUpdatedAt ? format(new Date(contact?.contactCreatedAt), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated on">
            <Typography variant="p14">
              {contact?.contactUpdatedAt ? format(new Date(contact?.contactUpdatedAt), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated by">
            <Typography variant="p14">{contact?.contactModifiedBy ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>
      </div>
      <SecondaryButton>Enrich contact details</SecondaryButton>
    </Container>
  );
};

export default ContactProfile;
