import React from 'react';
import { Card, CardContent } from '@mui/material';

const WhatsDue = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <h2>What's Due</h2>
        <ul>
          <li>Math Assignment - August 10</li>
          <li>Science Project - August 12</li>
          <li>History Essay - August 15</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default WhatsDue;
