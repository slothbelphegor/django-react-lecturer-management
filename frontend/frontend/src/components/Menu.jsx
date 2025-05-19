import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ArchiveIcon from '@mui/icons-material/Archive';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadIcon from '@mui/icons-material/Upload';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BookIcon from '@mui/icons-material/Book';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Link } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = React.useState('');
  const handleClick = (section) => {
    setOpen(open === section ? '' : section);
  };
  const location = useLocation(); // define which route is used
  const path = location.pathname;
  const navigate = useNavigate();
 
  const logoutUser = () => {
    AxiosInstance.post("logout/", {})
      .then(() => {
        localStorage.removeItem("Token");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    //   subheader={
    //     <ListSubheader component="div" id="nested-list-subheader">
    //       Lecturers
    //     </ListSubheader>
    //   }
    >
      <ListItemButton component={Link} to="/" selected={"/" === path}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={"Trang chủ"} />
      </ListItemButton>
      
      <ListItemButton 
        onClick={() => handleClick('lecturers')}
        component={Link}
        to="/lecturers"
        selected={"/lecturers" === path}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Giảng viên" />
      </ListItemButton>
      <ListItemButton 
        onClick={() => handleClick('subjects')}
        component={Link}
        to="/subjects"
        selected={"/subjects" === path}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Môn học" />
      </ListItemButton>
      <ListItemButton 
        onClick={() => handleClick('documents')}
        component={Link}
        to="/documents"
        selected={"/documents" === path}>
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Văn bản" />
      </ListItemButton>
      <ListItemButton 
        onClick={() => handleClick('users')}
        component={Link}
        to="/users"
        selected={"/users" === path}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Tài khoản" />
      </ListItemButton>
      
      
      <ListItemButton onClick={logoutUser}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Đăng xuất"} />
      </ListItemButton>
    </List>
  );
}
