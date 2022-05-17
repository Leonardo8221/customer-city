import { FC, useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as FilterGrayIcon } from 'assets/icons/filterGray.svg';
import { SearchDropdown } from 'components/SearchDropdown';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { CustomSelect } from 'components/CustomSelect';
import {
  Container,
  ProductsSection,
  ProducsContainer,
  VerticalDivider,
  CounterContainer,
  SectionTitleContainer,
} from './ui';
import { ProductModal } from './components';

const ProductDefiner: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((prevState) => !prevState);

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

            <SecondaryButton startIcon={<FilterGrayIcon />}>Filters</SecondaryButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <Box>
            <Typography variant="p14" sx={{ marginRight: 2 }}>
              Sort by
            </Typography>

            <CustomSelect<string>
              value="dateCreated"
              options={[{ label: 'Date created', value: 'dateCreated' }]}
              sx={{ minWidth: '175px' }}
              variant="outlined"
            />
          </Box>

          <VerticalDivider />

          <SecondaryButton>Import</SecondaryButton>

          <PrimaryButton startIcon={<PlusIcon />} sx={{ marginLeft: 2 }} onClick={toggleModal}>
            Add product
          </PrimaryButton>
        </Grid>
      </Grid>

      <ProductsSection>
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
      </ProductsSection>

      <ProductModal open={modalOpen} toggleOpen={toggleModal} />
    </Container>
  );
};

export default ProductDefiner;
