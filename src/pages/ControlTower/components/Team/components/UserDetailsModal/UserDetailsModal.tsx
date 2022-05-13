import { FC } from 'react';
import { Typography, IconButton, Divider, Box } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as ControlsIcon } from 'assets/icons/controls.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { SecondaryRedButton } from 'components/ui';
import { EditableInput } from 'components/EditableInput';
import { CustomSelect } from 'components/CustomSelect';
import { UserRole } from 'core/types';
import { USER_ROLE_OPTIONS } from 'core/constants';
import {
  Container,
  Modal,
  Header,
  HeaderTitleContainer,
  Footer,
  Main,
  NameContainer,
  EditButton,
  RoleSelectContainer,
} from './ui';

interface UserDetailsModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const UserDetailsModal: FC<UserDetailsModalProps> = ({ open, toggleOpen }) => {
  return (
    <Modal open={open} onClose={toggleOpen}>
      <Container>
        <Header>
          <HeaderTitleContainer>
            <Typography variant="p16">User details</Typography>

            <ControlsIcon />
          </HeaderTitleContainer>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </Header>

        <Main>
          <NameContainer>
            <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
              Name
            </Typography>

            <Typography variant="h3" sx={{ marginTop: 1.5 }}>
              Roger Lyons
            </Typography>

            <EditButton>
              <EditIcon />
            </EditButton>
          </NameContainer>

          <RoleSelectContainer>
            <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
              Role
            </Typography>
            <CustomSelect<UserRole> value={UserRole.USER} options={USER_ROLE_OPTIONS} />
          </RoleSelectContainer>

          <Divider sx={{ marginTop: 3 }} />

          <Box marginTop={3}>
            <EditableInput
              id="workEmail"
              name="workEmail"
              label="Work email"
              value="roger.lyons@gmail.com"
              type="email"
            />
          </Box>

          <Box marginTop={2}>
            <EditableInput
              id="workPhoneNumber"
              name="workPhoneNumber"
              label="Work phone number"
              value="+4 123 345 345"
              type="tel"
            />
          </Box>

          <Box marginTop={2}>
            <EditableInput
              id="workEmail"
              name="workEmail"
              label="Additional number"
              value="+4 123 345 123"
              type="tel"
            />
          </Box>
        </Main>

        <Divider />

        <Footer>
          <SecondaryRedButton fullWidth onClick={toggleOpen}>
            Inactive user
          </SecondaryRedButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default UserDetailsModal;
