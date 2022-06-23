import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useEffect, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyContainer } from './ui';
import format from 'date-fns/format';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as ContactAvatarIcon } from 'assets/icons/contactAvatar.svg';
import { Divider, Typography } from '@mui/material';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import {
  Contact,
  CONTACT_SOURCE_OPTIONS,
  CONTACT_STAGE_OPTIONS,
  CONTACT_STATUS_OPTIONS,
  CONTACT_TYPE_OPTIONS,
} from 'store/contact/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { SecondaryButton } from 'components/ui';
import { StyledDropDownPanel } from 'components/DropDownPanel';
import { CustomSelect } from 'components/CustomSelect';
import { useContact } from 'store/contact/hooks';

interface Props {
  contactId: number;
}

const ContactProperty: FC<Props> = ({ contactId }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { loading, error, contact, getContact, updateContact, deleteContact } = useContact();

  useEffect(() => {
    getContact(contactId);
  }, [contactId, getContact]);

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleDelete = async () => {
    contact && deleteContact(contact.contactId);
    toggleModalOpen();
    navigate(PRIVATE_ABS_ROUTE_PATHS.contacts);
  };

  const handleUpdate = (data: Partial<Contact>) => {
    contact && updateContact({ contactId: contact.contactId, data });
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

      <Divider sx={{ mx: 3 }} />

      <PropertyContainer>
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

          <TitleContainer label="Contact Source">
            <CustomSelect<string>
              value={contact?.contactSource ?? '-'}
              options={CONTACT_SOURCE_OPTIONS}
              sx={{
                '& .MuiSelect-select': {
                  padding: 0,
                },
              }}
              onSelect={async (value) => handleUpdate({ contactSource: value })}
            />
          </TitleContainer>

          <TitleContainer label="Contact Type">
            <CustomSelect<string>
              value={contact?.contactType ?? '-'}
              options={CONTACT_TYPE_OPTIONS}
              sx={{
                '& .MuiSelect-select': {
                  padding: 0,
                },
              }}
              onSelect={async (value) => handleUpdate({ contactType: value })}
            />
          </TitleContainer>

          <TitleContainer label="Contact Status">
            <CustomSelect<string>
              value={contact?.contactStatus ?? '-'}
              options={CONTACT_STATUS_OPTIONS}
              sx={{
                '& .MuiSelect-select': {
                  padding: 0,
                },
              }}
              onSelect={async (value) => handleUpdate({ contactStatus: value })}
            />
          </TitleContainer>

          <TitleContainer label="Contact Stage">
            <CustomSelect<string>
              value={contact?.contactStage ?? '-'}
              options={CONTACT_STAGE_OPTIONS}
              sx={{
                '& .MuiSelect-select': {
                  padding: 0,
                },
              }}
              onSelect={async (value) => handleUpdate({ contactStage: value })}
            />
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
      </PropertyContainer>
      {/* <SecondaryButton>Enrich contact details</SecondaryButton> */}
    </Container>
  );
};

export default ContactProperty;
