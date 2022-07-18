import { Box, Grid, Typography, Tabs, Button } from '@mui/material';
import { SearchDropdown } from 'components/SearchDropdown';
import { FC, useEffect, useState } from 'react';
import { Container, IntegrationsSection, TabItem } from './ui';
import { IntegrationCard } from './components/IntegrationCard';
import { useIntegration } from 'store/integration/hooks';
import { ReactComponent as FilterIcon } from 'assets/icons/filterBlue.svg';

const IntegrationPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const { loading, error, integrations, getIntegrations } = useIntegration();

  useEffect(() => {
    getIntegrations();
    if (integrations.length > 0) {
      console.log('=============================', integrations);
    }
  }, []);

  return (
    <Container>
      <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h2" sx={{ color: 'neutral.main' }}>
            Integration
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={2.5}>
            <Box width="75%" marginRight={2}>
              <Tabs value={0} aria-label="integration categories">
                <TabItem label="All" />
                <TabItem label="Marketing" />
                <TabItem label="Sales" />
                <TabItem label="Customer Service" />
                <TabItem label="Productivity" />
                <TabItem label="Finance" />
              </Tabs>
            </Box>
            <Box width="25%" display="flex" flexDirection="row">
              <Button variant="outlined" startIcon={<FilterIcon />}>
                Filter
              </Button>
              <Box width="100%">
                <SearchDropdown
                  id="search-integrations"
                  placeholder="Search all integrations..."
                  onSelect={(term) => setFilterValue(term)}
                  onChange={(term) => setSearchTerm(term)}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <IntegrationsSection>
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={index}
            integrationId={integration.integrationId}
            applicationName={integration.applicationName}
            applicationDescription={integration.applicationDescription}
            applicationIcon={integration.applicationIcon}
            applicationStatus={integration.applicationStatus}
          />
        ))}
      </IntegrationsSection>
    </Container>
  );
};

export default IntegrationPage;
