import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import FloatingCard from '../components/FloatingCard';

const NotFound = () => {
  const navigate = useNavigate();

  return <FloatingCard type="invisible" size="medium" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <Typography variant="h2" gutterBottom>
      404: Page Not Found
    </Typography>
    <Typography variant="body1" gutterBottom>
      Sorry, the page you are looking for does not exist.
    </Typography>
    <Button variant="contained" color="primary" onClick={() => navigate('/')}>
      Return Home
    </Button>
  </FloatingCard>
};

export default NotFound;