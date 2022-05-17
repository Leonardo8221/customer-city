import { FC, useState } from 'react';
import { Typography, IconButton, Divider, Box } from '@mui/material';

import { updateUser as updateUserApi } from 'http/user';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { SecondaryRedButton } from 'components/ui';
import { EditableInput } from 'components/EditableInput';
import { CustomSelect } from 'components/CustomSelect';
import { UserRole } from 'core/types';
import { USER_ROLE_OPTIONS } from 'core/constants';
import { User } from 'store/user/types';
import { Container, Modal, Header, HeaderTitleContainer, Footer, Main, NameContainer, RoleSelectContainer } from './ui';

interface UserDetailsModalProps {
  open: boolean;
  toggleOpen: () => void;
  user?: User;
}

const UserDetailsModal: FC<UserDetailsModalProps> = ({ open, toggleOpen, user }) => {
  const [activeUser, setActiveUser] = useState(true);

  const toggleActiveUser = () => setActiveUser((prevState) => !prevState);

  return (
    <Modal open={open} onClose={toggleOpen}>
      <Container>
        <Header>
          <HeaderTitleContainer>
            <Typography variant="p16">User details</Typography>
          </HeaderTitleContainer>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </Header>

        <Main>
          <NameContainer>
            <EditableInput
              id="userName"
              name="userName"
              label="Name"
              value={user?.userName ?? ''}
              fullWidth
              small={false}
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userName: value });
              }}
            />
          </NameContainer>

          <RoleSelectContainer>
            <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
              Role
            </Typography>

            <CustomSelect<UserRole>
              value={UserRole.USER}
              options={USER_ROLE_OPTIONS}
              onSelect={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userRole: value });
              }}
            />
          </RoleSelectContainer>

          <Divider sx={{ marginTop: 3 }} />

          <Box marginTop={3}>
            <EditableInput
              id="workEmail"
              name="workEmail"
              label="Work email"
              value={user?.userEmail ?? ''}
              fullWidth
              type="email"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userEmail: value });
              }}
            />
          </Box>

          <Box marginTop={2}>
            <EditableInput
              id="workPhoneNumber"
              name="workPhoneNumber"
              label="Work phone number"
              value={user?.profile.workPhoneNumber ?? ''}
              fullWidth
              type="tel"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { workPhoneNumber: value });
              }}
            />
          </Box>

          <Box marginTop={2}>
            <EditableInput
              id="additionalPhoneNumber"
              name="additionalPhoneNumber"
              label="Additional number"
              value={user?.profile.additionalPhoneNumber ?? ''}
              fullWidth
              type="tel"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { additionalPhoneNumber: value });
              }}
            />
          </Box>
        </Main>

        <Divider />

        <Footer>
          <SecondaryRedButton fullWidth onClick={toggleActiveUser}>
            {activeUser ? 'Inactivate User' : 'Reactivate User'}
          </SecondaryRedButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default UserDetailsModal;
