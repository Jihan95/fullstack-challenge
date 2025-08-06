import Announcement from './Announcement';
import WhatsDue from './Whatsdue';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid'
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import HeaderCard from './HeaderCard';
import { useState } from 'react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
        <Box sx={{ flexGrow: 1, px: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Topbar onMenuClick={handleDrawerToggle}/>
            <HeaderCard />
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 9 }}>
                      <Announcement />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <WhatsDue />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Box>
  );
};
export default Dashboard;