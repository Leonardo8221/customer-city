import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import format from 'date-fns/format';

import { deleteProduct as deleteProductApi } from 'http/product';
import { TableFooter } from 'components/TableFooter';
import { Product } from 'store/product/types';
import { mapProductCategoryToLabel, mapProductRateChargeTypeToLabel } from 'core/utils';
import { useProduct } from 'store/product/hooks';
import { BaseCheckbox, ColumnSortedAscendingIcon, ColumnSortedDescendingIcon, ColumnUnsortedIcon } from './ui';
import './ProductsTable.css';

const ProductFooter: FC = () => {
  const { getProducts } = useProduct();

  return (
    <TableFooter
      entity="product"
      pluralEntity="products"
      idProp="productId"
      onDelete={async (ids: number[]) => {
        await Promise.all(ids.map((id) => deleteProductApi(id)));
      }}
      onSuccess={getProducts}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: 'productName',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'productCategory',
    headerName: 'Category',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => mapProductCategoryToLabel(params.row.productCategory),
  },
  {
    field: 'productRateChargeType',
    headerName: 'Rate Change Type',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => mapProductRateChargeTypeToLabel(params.row.productRateChargeType),
  },
  {
    field: 'productPrice',
    headerName: 'Price/Fees',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => `$ ${params.row.productPrice}`,
  },
  {
    field: 'productUpdatedAt',
    headerName: 'Last Activity',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => format(new Date(params.row.productUpdatedAt), 'PP'),
  },
];

interface ProductsTableProps {
  products: Product[];
  setSelectedProduct: (product: Product) => void;
}

const ProductsTable: FC<ProductsTableProps> = ({ products, setSelectedProduct }) => {
  const [pageSize, setPageSize] = useState(5);

  const onRowClick = (params: GridRowParams) => {
    setSelectedProduct(params.row);
  };

  return (
    <Box style={{ height: 525, width: '100%' }} className="products-table">
      <DataGrid
        rows={products}
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
          Footer: ProductFooter,
          BaseCheckbox,
          ColumnSortedAscendingIcon,
          ColumnSortedDescendingIcon,
          ColumnUnsortedIcon,
        }}
        disableColumnMenu
        disableVirtualization
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={(row: Product) => row.productId as number}
      />
    </Box>
  );
};

export default ProductsTable;
