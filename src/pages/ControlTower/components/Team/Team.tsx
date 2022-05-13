import { FC, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { TableFooter } from 'components/TableFooter';
import { UserRole } from 'core/types';
import { SecondaryButton } from 'components/ui';
import { CustomSelect } from 'components/CustomSelect';
import { USER_ROLE_OPTIONS } from 'core/constants';
import {
  Container,
  BaseCheckbox,
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  ColumnUnsortedIcon,
  TitleContainer,
} from './ui';
import { AddNewUserModal, UserDetailsModal } from './components';
import './Team.css';

const users = [
  { id: 1, name: 'Roger Lyons 1', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 2, name: 'Roger Lyons 2', email: 'roger.lyons@gmail.com', role: 'owner', permissions: '' },
  { id: 3, name: 'Roger Lyons 3', email: 'roger.lyons@gmail.com', role: 'admin', permissions: '' },
  { id: 4, name: 'Roger Lyons 4', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 5, name: 'Roger Lyons 5', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 6, name: 'Roger Lyons 6', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 7, name: 'Roger Lyons 7', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 8, name: 'Roger Lyons 8', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 9, name: 'Roger Lyons 9', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 10, name: 'Roger Lyons 10', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },

  { id: 11, name: 'Roger Lyons 11', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 12, name: 'Roger Lyons 12', email: 'roger.lyons@gmail.com', role: 'owner', permissions: '' },
  { id: 13, name: 'Roger Lyons 13', email: 'roger.lyons@gmail.com', role: 'admin', permissions: '' },
  { id: 14, name: 'Roger Lyons 14', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 15, name: 'Roger Lyons 15', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 16, name: 'Roger Lyons 16', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 17, name: 'Roger Lyons 17', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 18, name: 'Roger Lyons 18', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 19, name: 'Roger Lyons 19', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 20, name: 'Roger Lyons 20', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },

  { id: 21, name: 'Roger Lyons 21', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 22, name: 'Roger Lyons 22', email: 'roger.lyons@gmail.com', role: 'owner', permissions: '' },
  { id: 23, name: 'Roger Lyons 23', email: 'roger.lyons@gmail.com', role: 'admin', permissions: '' },
  { id: 24, name: 'Roger Lyons 24', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 25, name: 'Roger Lyons 25', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 26, name: 'Roger Lyons 26', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 27, name: 'Roger Lyons 27', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 28, name: 'Roger Lyons 28', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 29, name: 'Roger Lyons 29', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 30, name: 'Roger Lyons 30', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },

  { id: 31, name: 'Roger Lyons 31', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 32, name: 'Roger Lyons 32', email: 'roger.lyons@gmail.com', role: 'owner', permissions: '' },
  { id: 33, name: 'Roger Lyons 33', email: 'roger.lyons@gmail.com', role: 'admin', permissions: '' },
  { id: 34, name: 'Roger Lyons 34', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 35, name: 'Roger Lyons 35', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 36, name: 'Roger Lyons 36', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 37, name: 'Roger Lyons 37', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 38, name: 'Roger Lyons 38', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 39, name: 'Roger Lyons 39', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
  { id: 40, name: 'Roger Lyons 40', email: 'roger.lyons@gmail.com', role: 'user', permissions: '' },
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
    renderCell: (params: GridRenderCellParams<string>) => (
      <CustomSelect<UserRole> value={params.value as UserRole} options={USER_ROLE_OPTIONS} />
    ),
  },
  {
    field: 'permissions',
    headerName: 'Permissions',
    flex: 2,
  },
];

const Team: FC = () => {
  const [modalOpen, setModalOpened] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const toggleModal = () => setModalOpened((prevState) => !prevState);

  const toggleDetails = () => setDetailsOpen((prevState) => !prevState);

  const onRowClick = () => toggleDetails();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleContainer>
            <Typography variant="h3" sx={{ color: 'neutral.main' }}>
              Users
            </Typography>

            <SecondaryButton startIcon={<PlusIcon />} onClick={toggleModal}>
              Add new user
            </SecondaryButton>
          </TitleContainer>
        </Grid>

        <Grid item xs={12} style={{ height: 480, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            headerHeight={40}
            rowHeight={64}
            // loading={loading}
            onRowClick={onRowClick}
            components={{
              Footer: TableFooter,
              BaseCheckbox,
              ColumnSortedAscendingIcon,
              ColumnSortedDescendingIcon,
              ColumnUnsortedIcon,
            }}
            disableColumnMenu
            disableVirtualization
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </Grid>
      </Grid>

      <AddNewUserModal open={modalOpen} toggleOpen={toggleModal} />

      <UserDetailsModal open={detailsOpen} toggleOpen={toggleDetails} />
    </Container>
  );
};

export default Team;
