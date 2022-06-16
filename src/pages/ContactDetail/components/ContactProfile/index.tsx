import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyHead } from './ui';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as ContactAvatarIcon } from 'assets/icons/contactAvatar.svg';
import { Divider, IconButton, Typography } from '@mui/material';
import { deleteContact as deleteContactApi } from 'http/contact';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Contact } from 'store/contact/types';

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
        <IconButton
          sx={{ borderRadius: 1, border: '1px solid #F0F3F8' }}
          onClick={() => console.log('property buttton click!')}
        >
          <ControlIcon />
        </IconButton>
      </PropertyHead>
    </Container>
  );
};

export default ContactProfile;
