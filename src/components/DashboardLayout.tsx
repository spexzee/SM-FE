import { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../pages/Sidebar/Sidebar';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1201,
                    backgroundColor: '#1e293b',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        SMS Platform
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                role={user?.role || null}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: sidebarOpen ? '250px' : 0,
                    marginTop: '64px',
                    transition: 'margin-left 0.3s ease-in-out',
                    backgroundColor: '#f8fafc',
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
