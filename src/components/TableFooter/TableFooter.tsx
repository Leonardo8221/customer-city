import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useGridApiContext, useGridRootProps, GridSelectedRowCount } from '@mui/x-data-grid';

import { useCompany } from 'store/company/hooks';
import { TablePagination } from '../TablePagination';
import { Container } from './ui';
import { CustomSelect } from '../CustomSelect';

const TableFooter: FC = () => {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const selectedRows = apiRef.current.getSelectedRows();

  const { deleteCompanies } = useCompany();

  const onDelete = () => {
    const selectedIds: number[] = [];

    selectedRows.forEach((value) => {
      selectedIds.push(value.id);
    });

    if (selectedIds.length === 0) return;

    deleteCompanies(selectedIds);
  };

  if (rootProps.hideFooter) return null;

  return (
    <Container>
      {!rootProps.hideFooterRowCount && selectedRows.size > 0 && (
        <Box sx={{ display: 'flex' }}>
          <GridSelectedRowCount selectedRowCount={selectedRows.size} />

          <Button onClick={onDelete}>Delete</Button>
        </Box>
      )}

      <CustomSelect<number>
        value={rootProps.pageSize as number}
        options={rootProps.rowsPerPageOptions.map((size) => ({ label: `${size} per page`, value: size }))}
        onSelect={async (value) => apiRef.current.setPageSize(value)}
        small
      />

      {!rootProps.hideFooterPagination && <TablePagination />}
    </Container>
  );
};

export default TableFooter;
