import { Card, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const HeaderCard = () => {
  return (
    <Card sx={{ 
      display: 'flex', 
      height: 230,
      p: 0,
      borderRadius: 2,
      overflow: 'hidden',
      margin: 0,
    }}>
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        p: 4 
      }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{
            background: 'linear-gradient(to right, #335A76, #9DDDCC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1.5,
            lineHeight: 1.4,
            width: 'fit-content',
          }}>
            EXAMS TIME
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here we are, Are you ready to fight? Don't worry, we prepared some tips to be ready for your exams.
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" fontStyle="italic" sx={{ mb: 1.5 }} style={{ color: '#555' }}>
            "Nothing happens until something moves" - Albert Einstein
          </Typography>
          <StyledButton variant="contained" style={{ fontSize: '1rem' }}>
            View exams tips
          </StyledButton>
        </Box>
      </Box>
      
      <Box sx={{ width: 700 }}>
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