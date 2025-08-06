import { Button, Container, Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = () => {
    dispatch(login());
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{
        bgcolor: '#16567C',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12 }}>
              <SchoolIcon sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome to Coligo Academy
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Comprehensive School Management System
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={handleLogin}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  borderColor: '#9DDDCC',
                  color: '#fff'
                }}
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container justifyContent="center" spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
              Our Platform Features
            </Typography>
          </Grid>
          
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <ClassIcon sx={{ fontSize: 60, mb: 2, color:"#16567C" }} />
                <Typography variant="h5" gutterBottom>Class Management</Typography>
                <Typography>Efficiently organize classes, schedules, and student rosters</Typography>
              </Paper>
            </Grid>
            
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 60, mb: 2,  color:"#16567C"}} />
                <Typography variant="h5" gutterBottom>Assignments</Typography>
                <Typography>Create, distribute, and grade assignments seamlessly</Typography>
              </Paper>
            </Grid>
            
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <PeopleIcon sx={{ fontSize: 60, mb: 2,  color:"#16567C" }} />
                <Typography variant="h5" gutterBottom>Student Portal</Typography>
                <Typography>Personalized access to grades and resources</Typography>
              </Paper>
            </Grid>
            
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 60, mb: 2 ,  color:"#16567C" }} />
                <Typography variant="h5" gutterBottom>Administration</Typography>
                <Typography>Comprehensive tools for school administration</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{
        bgcolor: theme.palette.grey[200],
        py: 4,
        mt: 'auto',
        textAlign: 'center'
      }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12 }}>
              <Typography variant="body1">
                © {new Date().getFullYear()} Greenfield Academy. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;