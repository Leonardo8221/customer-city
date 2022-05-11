import { FC } from 'react';
import { Grid, Typography, MenuItem } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { TableFooter } from 'components/TableFooter';
import { mapLabelToUserRole } from 'core/utils';
import { UserRole } from 'core/types';
import {
  Container,
  BaseCheckbox,
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  ColumnUnsortedIcon,
  Select,
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
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            Users
          </Typography>
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
    </Container>
  );
};

export default Team;
