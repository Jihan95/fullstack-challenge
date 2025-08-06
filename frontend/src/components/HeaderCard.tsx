import { Card, Typography, Button, Box, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

const HeaderCard = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' },
      height: { xs: 'auto', md: 230 },
      p: 0,
      borderRadius: 2,
      overflow: 'hidden',
      margin: 0,
      alignItems: 'stretch'
    }}>
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        p: { xs: 2, sm: 3, md: 4 },
        minWidth: 0
      }}>
        <Box>
          <Typography variant={isSmall ? "h5" : "h4"} fontWeight="bold" sx={{
            background: 'linear-gradient(to right, #335A76, #9DDDCC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1.5,
            lineHeight: 1.4,
            width: 'fit-content',
          }}>
            EXAMS TIME
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
            Here we are, Are you ready to fight? Don't worry, we prepared some tips to be ready for your exams.
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" fontStyle="italic" sx={{ mb: 1.5, color: '#555', fontSize: { xs: '0.85rem', sm: '1rem' } }}>
            "Nothing happens until something moves" - Albert Einstein
          </Typography>
          <StyledButton variant="contained" style={{ fontSize: isSmall ? '0.95rem' : '1rem' }}>
            View exams tips
          </StyledButton>
        </Box>
      </Box>
      
      <Box
        sx={{
          width: { xs: '100%', md: 350, lg: 400, xl: 700 },
          height: { xs: 180, sm: 220, md: '100%' },
          flexShrink: 0,
          alignSelf: { xs: 'center', md: 'stretch' },
          display: 'flex',
        }}
      >
        <img 
          src="./img.jpg" 
          alt="Exam illustration" 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }} 
        />
      </Box>
    </Card>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2eaba9ff',
  color: '#fff',
  borderRadius: '8px',
  padding: '8px 20px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#225e5cff',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  transition: 'all 0.3s ease'
}))

export default HeaderCard