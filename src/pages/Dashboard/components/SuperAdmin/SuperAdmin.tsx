import { FC, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/ui';
import { privateRoutePaths } from 'router/routes';
import { useCompany } from 'store/company/hooks';
import { TableFooter } from 'components/TableFooter';
import { Company } from 'store/company/types';

const columns: GridColDef[] = [
  {
    field: 'companyName',
    headerName: 'Company Name',
    flex: 1,
  },
  {
    field: 'ownerName',
    headerName: 'Owner',
    flex: 1,
  },
  {
    field: 'companyCreatedAt',
    headerName: 'Created',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.companyCreatedAt).toLocaleDateString(),
  },
];

const SuperAdmin: FC = () => {
  const navigate = useNavigate();
  const { loading, error, companies, getCompanies } = useCompany();

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRowClick = (params: GridRowParams) => {
    navigate(privateRoutePaths.createCompany, { state: { ...params.row } });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Users</Typography>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            rows={companies}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            loading={loading}
            onRowClick={onRowClick}
            components={{ Footer: TableFooter }}
            getRowId={(row: Company) => row.companyId}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={() => navigate(privateRoutePaths.createCompany)}>Add New Company</Button>
          </Box>
        </Grid>

        {!!error && (
          <Grid item xs={12}>
            <Typography variant="caption" color="red">
              {typeof error === 'string' ? error : 'Something went wrong!'}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SuperAdmin;
