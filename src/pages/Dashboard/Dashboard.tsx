import { FC } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { Navbar } from 'components/Navbar';
import { Button } from 'components/ui';
import { privateRoutes } from 'router/routes';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Company Name',
    flex: 1,
  },
  {
    field: 'ownerName',
    headerName: 'Owner',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    flex: 1,
  },
];

const rows = [
  { id: 1, name: 'Snow Down', ownerName: 'Jon Dow', createdAt: new Date().toLocaleDateString() },
  { id: 2, name: 'Snow Down', ownerName: 'Jon Dow', createdAt: new Date().toLocaleDateString() },
  { id: 3, name: 'Snow Down', ownerName: 'Jon Dow', createdAt: new Date().toLocaleDateString() },
  { id: 4, name: 'Snow Down', ownerName: 'Jon Dow', createdAt: new Date().toLocaleDateString() },
];

const Dashboard: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid container spacing={2} style={{ marginTop: 70 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Users</Typography>
          </Grid>

          <Grid item xs={12}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => navigate(privateRoutes.createCompany)}>Add New Company</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
