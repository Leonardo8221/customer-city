import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { GridPagination, useGridApiContext, useGridRootProps, GridSelectedRowCount } from '@mui/x-data-grid';
import { Container } from './ui';

const TableFooter: FC = () => {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const selectedRows = apiRef.current.getSelectedRows();

  if (rootProps.hideFooter) return null;

  return (
    <Container>
      {!rootProps.hideFooterRowCount && selectedRows.size > 0 && (
        <Box>
          <GridSelectedRowCount selectedRowCount={selectedRows.size} />

          <Button>Delete</Button>
        </Box>
      )}
      {!rootProps.hideFooterPagination && <GridPagination />}
    </Container>
  );
};

export default TableFooter;
