import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Avatar, Badge, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'

const Topbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile && (
            <IconButton
              onClick={onMenuClick}
              sx={{
                color: 'primary.main',
                mr: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h5">Welcome Talia,</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 1, px: 1 }}>
            <SearchIcon />
            <InputBase placeholder="Search" />
          </Box>
          <Badge badgeContent={1} color="primary"><NotificationsIcon /></Badge>
          <Badge badgeContent={3} color="primary"><MailIcon /></Badge>
          <Avatar alt="User" src="/path-to-profile.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
