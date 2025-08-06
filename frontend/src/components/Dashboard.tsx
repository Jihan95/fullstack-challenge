import Announcement from './Announcement'
import WhatsDue from './Whatsdue'
import { Container, Box } from '@mui/material'
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
        <Box sx={{ flexGrow: 1, px: 3}}>
            <Topbar onMenuClick={handleDrawerToggle}/>
            <HeaderCard />
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                    <Announcement />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                    <WhatsDue />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Box>
  );
};
export default Dashboard;