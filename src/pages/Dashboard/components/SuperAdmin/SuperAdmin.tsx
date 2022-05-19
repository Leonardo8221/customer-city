import { FC, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { deleteCompany as deleteCompanyApi } from 'http/company';
import { Button } from 'components/ui';
import { privateRoutePaths } from 'router/routes';
import { useCompany } from 'store/company/hooks';
import { TableFooter } from 'components/TableFooter';
import { Company } from 'store/company/types';
import { BaseCheckbox, ColumnSortedAscendingIcon, ColumnSortedDescendingIcon, ColumnUnsortedIcon } from './ui';

const CompanyFooter: FC = () => {
  const { getCompanies } = useCompany();

  return (
    <TableFooter
      entity="company"
      pluralEntity="companies"
      idProp="companyId"
      onDelete={async (ids: number[]) => {
        await Promise.all(ids.map((id) => deleteCompanyApi(id)));
      }}
      onSuccess={getCompanies}
    />
  );
};

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

        <Grid item xs={12} style={{ height: 480, width: '100%' }}>
          <DataGrid
            rows={companies}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            loading={loading}
            onRowClick={onRowClick}
            getRowId={(row: Company) => row.companyId}
            headerHeight={40}
            rowHeight={64}
            components={{
              Footer: CompanyFooter,
              BaseCheckbox,
              ColumnSortedAscendingIcon,
              ColumnSortedDescendingIcon,
              ColumnUnsortedIcon,
            }}
            disableColumnMenu
            disableVirtualization
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
