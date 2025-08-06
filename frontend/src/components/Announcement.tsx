import React from 'react';
import { Card, CardContent } from '@mui/material';

const Announcement = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <h2>Announcements</h2>
        <ul>
          <li>New course materials available starting next week.</li>
          <li>Maintenance window on Friday from 8 PM to 10 PM.</li>
          <li>Check your inbox for the upcoming exam schedule.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Announcement;
