import { FC, useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';

import { updateUser as updateUserApi } from 'http/user';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { TableFooter } from 'components/TableFooter';
import { UserRole } from 'core/types';
import { SecondaryButton } from 'components/ui';
import { CustomSelect } from 'components/CustomSelect';
import { USER_ROLE_OPTIONS } from 'core/constants';
import { User } from 'store/user/types';
import { Loader } from 'components/Loader';
import { useUser } from 'store/user/hooks';
import {
  Container,
  BaseCheckbox,
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  ColumnUnsortedIcon,
  TitleContainer,
} from './ui';
import { AddNewUserModal, UserDetailsModal } from './components';

const columns: GridColDef[] = [
  {
    field: 'userName',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'userEmail',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'userRole',
    headerName: 'Role',
    flex: 1,
    renderCell: (params: GridRenderCellParams<string>) => (
      <CustomSelect<UserRole>
        value={params.value as UserRole}
        options={USER_ROLE_OPTIONS}
        onSelect={async (value) => {
          if (!params.row?.userId) return;
          await updateUserApi(params.row.userId, { userRole: value });
        }}
      />
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
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);
  const { loading, error, users, getUsers } = useUser();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = () => setModalOpened((prevState) => !prevState);

  const toggleDetails = () => {
    if (detailsOpen) setSelectedUserId(undefined);
    setDetailsOpen((prevState) => !prevState);
  };

  const onRowClick = (params: GridRowParams) => {
    setSelectedUserId(params.row.userId);
    toggleDetails();
  };

  return (
    <Container position="relative">
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
            loading={loading}
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
            getRowId={(row: User) => row.userId as number}
          />
        </Grid>

        {!!error && (
          <Grid item xs={12}>
            <Typography variant="caption" color="red">
              {typeof error === 'string' ? error : 'Something went wrong!'}
            </Typography>
          </Grid>
        )}
      </Grid>

      <AddNewUserModal open={modalOpen} toggleOpen={toggleModal} />

      <UserDetailsModal open={detailsOpen} toggleOpen={toggleDetails} userId={selectedUserId} />

      {loading && <Loader />}
    </Container>
  );
};

export default Team;
