import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider, Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookIcon from '@mui/icons-material/MenuBook';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ open, setOpen }: SidebarProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleDrawerClose = () => setOpen(false);

    const items = [
        { text: 'Dashboard', icon: <DashboardIcon sx={{ color: 'white' }} /> },
        { text: 'Schedule', icon: <CalendarTodayIcon sx={{ color: 'white' }} /> },
        { text: 'Courses', icon: <BookIcon sx={{ color: 'white' }} /> },
        { text: 'Gradebook', icon: <GradeIcon sx={{ color: 'white' }} /> },
        { text: 'Performance', icon: <TrendingUpIcon sx={{ color: 'white' }} /> },
        { text: 'Announcement', icon: <CampaignIcon sx={{ color: 'white' }} /> },
        { text: 'Logout', icon: <LogoutIcon sx={{ color: 'white' }} /> }
    ];

    return (
        <>
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? open : true}
                onClose={handleDrawerClose}
                sx={{
                    width: 280,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                        background: 'linear-gradient(to bottom, #16567C, #3C8399)',
                        borderRight: 'none',
                        margin: 0,
                        padding: 0,
                    },
                }}
            >
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <SchoolIcon sx={{
                        fontSize: 40,
                        mb: 1,
                        color: 'white'
                    }} />
                    <Typography variant="h6" color="white" fontWeight="bold" fontSize="2.5rem">
                        Coligo
                    </Typography>
                </Box>
                <Divider sx={{
                    my: 1,
                    backgroundColor: 'rgba(255,255,255,0.2)'
                }} />
                <List>
                    {items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                onClick={item.text === 'Logout' ? handleLogout : handleDrawerClose}
                                sx={{
                                    borderRadius: 2,
                                    mx: 1.5,
                                    my: 0.5,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#16567C',
                                        '& .MuiListItemIcon-root': {
                                            color: '#16567C'
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: '#16567C'
                                        }
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 40,
                                    color: 'white'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: 'medium',
                                        color: 'inherit'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;