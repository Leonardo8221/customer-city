import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { Pipeline } from 'pages/HyperFunnel/PipelinesProvider';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { IconButton, styled } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function HyperFunnelPipelineCard(props:{
  pipeline: Pipeline
}) {
  return (
    <StyledCard>
      <CardHeader 
        title = {props.pipeline.pipelineName}
        action = {
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }        
      />
    </StyledCard>
  );
}



const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%'
}))