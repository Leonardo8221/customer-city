import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyHead } from './ui';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as ContactAvatarIcon } from 'assets/icons/contactAvatar.svg';
import { Divider, Typography } from '@mui/material';
import { deleteContact as deleteContactApi } from 'http/contact';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Contact } from 'store/contact/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';

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
          <PopoverWrapper>
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
            entity={'contact'}
          />
        </div>
      </ProfileHead>
      <Divider />
      <PropertyHead>
        <Typography variant="h3">{'Properties'}</Typography>
        {/* <IconButton
          sx={{ borderRadius: 1, border: '1px solid #F0F3F8' }}
          onClick={() => console.log('property buttton click!')}
        >
          <ControlIcon />
        </IconButton> */}
      </PropertyHead>
      <TitleContainer label="Work title">
        <Typography variant="p14">{contact?.contactTitle}</Typography>
      </TitleContainer>

      <TitleContainer label="Work department">
        <Typography variant="p14">{contact?.contactAssociate}</Typography>
      </TitleContainer>

      <TitleContainer label="Company name">
        <Typography variant="p14">{contact?.contactAssociate}</Typography>
      </TitleContainer>

      <TitleContainer label="Work Address">
        <Typography variant="p14">
          {contact?.contactZipCode} {contact?.contactStreet} {contact?.contactCity}, {contact?.contactState},{' '}
          {contact?.contactCountry}
        </Typography>
      </TitleContainer>

      <Divider />

      <TitleContainer label="Type of contact">
        <Typography variant="p14"></Typography>
      </TitleContainer>

      <Divider />

      <TitleContainer label="Work email">
        <Typography variant="p14">{contact?.contactPrimaryEmail}</Typography>
      </TitleContainer>

      <TitleContainer label="Work email">
        <Typography variant="p14">{contact?.contactPhoneNumber}</Typography>
      </TitleContainer>

      <TitleContainer label="Work email">
        <Typography variant="p14">{contact?.contactMobileNumber}</Typography>
      </TitleContainer>
    </Container>
  );
};

export default ContactProfile;
