import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import {Link}  from 'react-router-dom'
import AxiosInstance from './AxiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Menu() {
    const [open, setOpen] = React.useState(true);
    const location = useLocation();  // define which route is used
    const path = location.pathname 
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(!open);
    };
    const logoutUser = () => {
        AxiosInstance.post('logout/', {})
         .then(() => {
            localStorage.removeItem('Token');
            navigate('/login');
          })
         .catch((error) => {
            console.log(error);
          });
      }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                   Lecturers
                </ListSubheader>
            }
        >
            <ListItemButton component={Link} to="/"
                selected={"/" === path}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
            </ListItemButton>
            <ListItemButton component={Link} to="/lecturers"
                selected={"/lecturers" === path}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"Browse Lecturers"} />
            </ListItemButton>
            <ListItemButton component={Link} to="/lecturers/create"
                selected={"/lecturers/create" === path}>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Lecturer"} />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Temp" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GroupAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Test" />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton onClick={logoutUser}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
            </ListItemButton>
        </List>
    );
}
