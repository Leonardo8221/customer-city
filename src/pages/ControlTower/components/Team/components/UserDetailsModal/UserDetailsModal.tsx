import { FC } from 'react';
import { Typography, IconButton, Divider } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as ControlsIcon } from 'assets/icons/controls.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { SecondaryRedButton } from 'components/ui';
import { UserDetail } from 'components/UserDetail';
import { Container, Modal, Header, HeaderTitleContainer, Footer, Main, NameContainer, EditButton } from './ui';

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

          <UserDetail label="Role" value="Business owner" sx={{ marginTop: 3 }} />

          <Divider sx={{ marginTop: 3 }} />

          <UserDetail label="Work email" value="roger.lyons@gmail.com" type="email" sx={{ marginTop: 3 }} />

          <UserDetail label="Work phone number" value="+4 123 345 345" type="tel" sx={{ marginTop: 2 }} />

          <UserDetail label="Additional number" value="+4 123 345 123" type="tel" sx={{ marginTop: 2 }} />
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
