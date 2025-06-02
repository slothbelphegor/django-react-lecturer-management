import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { RoleContext } from "./RoleContext";

const AllowedRoute = ({allowedRoles}) => {
    const {role} = useContext(RoleContext);
    console.log("AllowedRoute role: ", role);
    // Outlet is the child components
    return (
        allowedRoles.includes(role) ? <Outlet /> :null
    )
}

export default AllowedRoute;