import { FC, useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { SearchDropdown } from 'components/SearchDropdown';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { Product } from 'store/product/types';
import { useProduct } from 'store/product/hooks';
import { Loader } from 'components/Loader';
import { Container, ProductsSection, ProducsContainer, CounterContainer, SectionTitleContainer } from './ui';
import { ProductModal } from './components';
import { ProductsTable } from './components/ProductsTable';

const ProductDefiner: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const { loading, error, products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = () => {
    if (modalOpen && selectedProduct) setSelectedProduct(undefined);
    setModalOpen((prevState) => !prevState);
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" sx={{ color: 'neutral.main' }}>
            Product Definer
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="center" marginTop={2.5}>
            <Box width="250px" marginRight={2}>
              <SearchDropdown id="search-products" placeholder="Search all products..." />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <SecondaryButton>Import</SecondaryButton>

          <PrimaryButton startIcon={<PlusIcon />} sx={{ marginLeft: 2 }} onClick={toggleModal}>
            Add product
          </PrimaryButton>
        </Grid>
      </Grid>

      <ProductsSection>
        {products.length > 0 ? (
          <ProductsTable
            setSelectedProduct={(product) => {
              setSelectedProduct(product);
              toggleModal();
            }}
          />
        ) : (
          <>
            <SectionTitleContainer>
              <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.main' }}>
                PRODUCTS
              </Typography>

              <CounterContainer>
                <Typography variant="labelRegular12" sx={{ color: 'neutral.main' }}>
                  0
                </Typography>
              </CounterContainer>
            </SectionTitleContainer>

            <ProducsContainer marginTop={1}>
              <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.n400' }}>
                You have not added any products yet
              </Typography>

              <PrimaryButton startIcon={<PlusIcon />} sx={{ marginTop: 3 }} onClick={toggleModal}>
                Add new product
              </PrimaryButton>
            </ProducsContainer>
          </>
        )}
      </ProductsSection>

      <ProductModal open={modalOpen} toggleOpen={toggleModal} product={selectedProduct} />

      {!!error && (
        <Typography variant="caption" color="red">
          {typeof error === 'string' ? error : 'Something went wrong!'}
        </Typography>
      )}

      {loading && <Loader />}
    </Container>
  );
};

export default ProductDefiner;
