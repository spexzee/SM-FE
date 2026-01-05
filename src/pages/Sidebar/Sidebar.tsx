import './sidebar.scss';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SuperAdminMenuItems, SchoolAdminMenuItems, TeachersMenuItems, StudentsMenuItems } from './SidebarUtils'
import { Avatar, Toolbar, Typography } from '@mui/material';
import type { SideBarMenuItemType } from './SidebarUtils';
import TokenService from '../../queries/token/tokenService';

const Sidebar = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: string | null }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>('Dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (itemName: string) => {
    setSelectedItem(itemName);
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
      <div style={{
        height: 'calc(100vh - 150px)',
        overflowY: 'auto',
        padding: '16px',
      }}>
        {menuItems.map((item: SideBarMenuItemType) => {
          const isSelected = selectedItem === item.name || location.pathname === item.path;

          return (
            <div
              key={item.name}
              onClick={() => {
                navigate(item.path!);
                handleSelect(item.name);
              }}
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
    </div>
  );
}

export default Sidebar;