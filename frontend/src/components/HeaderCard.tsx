import { Card, CardContent, Typography, Button, Box } from '@mui/material'

const HeaderCard = () => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold">EXAMS TIME</Typography>
        <Typography variant="body2">Here we are, Are you ready to fight? Don’t worry, we prepared some tips</Typography>
        <Button variant="contained" sx={{ mt: 1 }}>View exams tips</Button>
      </Box>
      <img src="/img.png" alt="Exam illustration" width={150} />
    </Card>
  )
}

export default HeaderCard
