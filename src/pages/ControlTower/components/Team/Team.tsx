import { FC, useState } from 'react';
import { Grid, Typography, MenuItem, Divider, IconButton, InputLabel, TextField, Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { TableFooter } from 'components/TableFooter';
import { mapLabelToUserRole } from 'core/utils';
import { UserRole } from 'core/types';
import { SecondaryButton, TextButton } from 'components/ui';
import {
  Container,
  BaseCheckbox,
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  ColumnUnsortedIcon,
  Select,
  TopContainer,
  Modal,
  ModalContent,
} from './ui';
import './Team.css';

const users = [
  { id: 1, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
  { id: 2, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Owner', permissions: '' },
  { id: 3, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Administrator', permissions: '' },
  { id: 4, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
  { id: 5, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
  { id: 6, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
  { id: 7, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
  { id: 8, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
  { id: 9, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
  { id: 10, name: 'Roger Lyons', email: 'roger.lyons@gmail.com', role: 'Business User', permissions: '' },
];

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
        <Select value={mapLabelToUserRole(params.value as UserRole)} label={params.value}>
          <MenuItem value={UserRole.ADMIN}>Administrator</MenuItem>
          <MenuItem value={UserRole.OWNER}>Owner</MenuItem>
          <MenuItem value={UserRole.USER}>Business User</MenuItem>
        </Select>
      );
    },
  },
  {
    field: 'permissions',
    headerName: 'Permissions',
    flex: 2,
  },
];

const Team: FC = () => {
  const [modalOpen, setModalOpened] = useState(false);

  const toggleModal = () => setModalOpened((prevState) => !prevState);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopContainer>
            <Typography variant="h3" sx={{ color: 'neutral.main' }}>
              Users
            </Typography>

            <SecondaryButton startIcon={<PlusIcon />} onClick={toggleModal}>
              Add new user
            </SecondaryButton>
          </TopContainer>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            headerHeight={40}
            rowHeight={64}
            // loading={loading}
            // onRowClick={onRowClick}
            components={{
              Footer: TableFooter,
              BaseCheckbox,
              ColumnSortedAscendingIcon,
              ColumnSortedDescendingIcon,
              ColumnUnsortedIcon,
            }}
            disableColumnMenu
            disableVirtualization
          />
        </Grid>
      </Grid>

      <Modal open={modalOpen} onClose={toggleModal}>
        <ModalContent>
          <TopContainer sx={{ paddingBottom: 2.5, paddingTop: 1 }}>
            <Typography variant="h3" sx={{ color: 'neutral.main' }}>
              New User
            </Typography>

            <IconButton onClick={toggleModal}>
              <CrossIcon />
            </IconButton>
          </TopContainer>

          <Divider />

          <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <InputLabel htmlFor="name" sx={{ marginBottom: 1 }}>
                  Name
                </InputLabel>
                <TextField id="name" name="name" type="text" fullWidth />
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <InputLabel htmlFor="email" sx={{ marginBottom: 1 }}>
                  Work email
                </InputLabel>
                <TextField id="email" name="email" type="email" fullWidth />
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <InputLabel htmlFor="phone" sx={{ marginBottom: 1 }}>
                  Work phone number
                </InputLabel>
                <TextField id="phone" name="phone" type="text" fullWidth />
              </Grid>

              <Grid item xs={6}>
                <InputLabel htmlFor="extraPhone" sx={{ marginBottom: 1 }}>
                  Additional number (optional)
                </InputLabel>
                <TextField id="extraPhone" name="extraPhone" type="text" fullWidth />
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <InputLabel htmlFor="role" sx={{ marginBottom: 1 }}>
                  Role
                </InputLabel>
                <TextField id="role" name="role" type="text" fullWidth />
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ paddingTop: 2.5 }} />

          <Box sx={{ paddingTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <TextButton sx={{ marginRight: 3 }} onClick={toggleModal}>
              Cancel
            </TextButton>

            <Button variant="contained">Add new user</Button>
          </Box>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Team;
