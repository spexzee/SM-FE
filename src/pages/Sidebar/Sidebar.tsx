import './sidebar.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { SuperAdminMenuItems, SchoolAdminMenuItems, TeachersMenuItems, StudentsMenuItems } from './SidebarUtils'
import { Avatar, Toolbar, Typography, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import type { SideBarMenuItemType } from './SidebarUtils';
import TokenService from '../../queries/token/tokenService';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: string | null;
  onLogout?: () => void;
}

const Sidebar = ({ isOpen, onClose, role, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  // Updated menu items logic based on role
  const getMenuItems = () => {
    switch (role) {
      case "super_admin":
        return SuperAdminMenuItems;
      case "sch_admin":
        return SchoolAdminMenuItems;
      case "teacher":
        return TeachersMenuItems;
      case "student":
        return StudentsMenuItems;
      default:
        return SuperAdminMenuItems;
    }
  };

  const menuItems = getMenuItems();

  // Get logged-in user's name from token
  const userName = TokenService.getUserName();
  const name = userName || "User";

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      style={{
        zIndex: 100,
        background: '#1e293b',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar className="navbar-toolbar" />
      {isOpen && (
        <div
          className="sidebar-header"
          style={{
            padding: '20px',
            borderBottom: '1px solid #334155',
          }}
        >
          <Avatar
            alt="User Avatar"
            src={''}
            sx={{
              width: 45,
              height: 45,
              background: '#3b82f6',
              fontSize: '1.2rem',
            }}
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>
          <div className="welcome-text" style={{ padding: '10px', color: '#fff' }}>
            <Typography style={{
              fontWeight: '600',
              color: 'white',
              fontSize: '1rem',
            }}>
              {name}
            </Typography>
            <Typography style={{
              color: '#94a3b8',
              fontSize: '0.75rem',
              textTransform: 'capitalize',
            }}>
              {role?.replace('_', ' ') || 'User'}
            </Typography>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
      }}>
        {menuItems.map((item: SideBarMenuItemType) => {
          const isSelected = location.pathname === item.path;

          return (
            <div
              key={item.name}
              onClick={() => handleNavigate(item.path!)}
              className={`menu-item ${isSelected ? 'selected' : ''}`}
              style={{
                background: isSelected ? '#3b82f6' : 'transparent',
                borderRadius: '8px',
                marginBottom: '4px',
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: isSelected ? 'white' : '#cbd5e1',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: isSelected ? '500' : '400',
                flex: 1,
              }}>
                {item.icon}
                <span>{item.name}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Logout Button at Bottom */}
      {isOpen && onLogout && (
        <div style={{ padding: '16px' }}>
          <Divider sx={{ borderColor: '#334155', mb: 2 }} />
          <div
            onClick={onLogout}
            className="menu-item"
            style={{
              background: 'transparent',
              borderRadius: '8px',
              padding: '12px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#ef4444',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flex: 1,
            }}>
              <LogoutIcon />
              <span>Logout</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;