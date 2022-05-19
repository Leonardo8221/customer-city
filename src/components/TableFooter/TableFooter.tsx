import { FC } from 'react';
import { useGridApiContext, useGridRootProps, GridSelectedRowCount } from '@mui/x-data-grid';

import { useCompany } from 'store/company/hooks';
import { TablePagination } from '../TablePagination';
import { CustomSelect } from '../CustomSelect';
import { SecondaryButton } from '../ui';
import { Container, SelectedRowsContainer } from './ui';

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
        <SelectedRowsContainer>
          <GridSelectedRowCount selectedRowCount={selectedRows.size} />

          <SecondaryButton onClick={onDelete}>Delete</SecondaryButton>
        </SelectedRowsContainer>
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
