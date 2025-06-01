import { Outlet, Navigate } from "react-router-dom";


const AllowedRoute = ({allowedRoles}) => {
    const role = localStorage.getItem('Role');
    // Outlet is the child components
    return (
        allowedRoles.includes(role) ? <Outlet /> :null
    )
}

export default AllowedRoute;