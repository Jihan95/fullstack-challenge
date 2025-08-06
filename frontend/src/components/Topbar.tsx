import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Avatar, Badge, useMediaQuery, alpha } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'

const Topbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        padding: { xs: 1, sm: 2 },
        marginBottom: 3,
        width: '100%',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        px: { xs: 2, sm: 3 },
        minHeight: '64px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile && (
            <IconButton
              onClick={onMenuClick}
              sx={{
                color: '#588F9A',
                mr: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: '#828d89ff',
            fontSize: { xs: '0.875rem', sm: '2rem' }
          }}>
            Welcome Talia,
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: alpha(theme.palette.action.hover, 0.05),
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '24px',
            px: 1.5,
            py: 0.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
            }
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase 
              placeholder="Search..." 
              sx={{ 
                width: { xs: '100px', sm: '150px', md: '200px' },
                '& input': {
                  py: 0.5
                }
              }} 
            />
          </Box>
          
          <IconButton sx={{ 
            color: '#34727eff',
            '&:hover': {
              backgroundColor: alpha('#588F9A', 0.1),
            }
          }}>
            <Badge 
              badgeContent={1} 
              sx={{
                '& .MuiBadge-badge': {
                  color: '#fff',
                  backgroundColor: '#5DBEAF',
                  fontSize: '1rem',
                  height: '20px',
                  minWidth: '20px',
                }
              }}
            >
              <NotificationsIcon sx={{ fontSize: '2rem' }} />
            </Badge>
          </IconButton>
          
          <IconButton sx={{ 
            color: '#34727eff',
            '&:hover': {
              backgroundColor: alpha('#588F9A', 0.1),
            }
          }}>
            <Badge 
              badgeContent={3} 
              sx={{
                '& .MuiBadge-badge': {
                  color: '#fff',
                  backgroundColor: '#5DBEAF',
                  fontSize: '1rem',
                  height: '20px',
                  minWidth: '20px',
                }
              }}
            >
              <MailIcon sx={{ fontSize: '2rem' }} />
            </Badge>
          </IconButton>
          
          <Avatar 
            alt="User" 
            src="/path-to-profile.jpg" 
            sx={{ 
              width: 36, 
              height: 36,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              '&:hover': {
                borderColor: theme.palette.primary.main
              }
            }} 
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar