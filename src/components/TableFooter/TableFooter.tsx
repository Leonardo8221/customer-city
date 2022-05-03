import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { GridPagination, useGridApiContext, useGridRootProps, GridSelectedRowCount } from '@mui/x-data-grid';

import { useCompany } from 'store/company/hooks';
import { Container } from './ui';

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
        <Box>
          <GridSelectedRowCount selectedRowCount={selectedRows.size} />

          <Button onClick={onDelete}>Delete</Button>
        </Box>
      )}
      {!rootProps.hideFooterPagination && <GridPagination />}
    </Container>
  );
};

export default TableFooter;
