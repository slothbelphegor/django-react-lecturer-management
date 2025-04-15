import { React, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AxiosInstance from "../../components/AxiosInstance";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MaterialReactTable } from "material-react-table";

const ListLecturer = () => {
  const [lecturers, setLecturers] = useState([]);
  
  const getData = () => {
    AxiosInstance.get("lecturers/").then((res) => {
      setLecturers(res.data);
    });
  };

  useEffect(() => {
          getData();
      }, []) // get data on initial load page
  

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "subject_names",
        header: "Subjects",
        Cell: ({ cell }) => (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {cell.getValue()?.map((char, index) => (
              <Chip key={index} label={char} />
            ))}
          </div>
        ),
      },
      {
        accessorKey: "recommender_details.full_name",
        header: "Recommender",
      }
    ]
  , []);
  return (
    <div>
      <Box className="topbar">
        <CalendarViewMonthIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          List of lecturers
        </Typography>
      </Box>

      <MaterialReactTable 
        columns={columns}
        data={lecturers}
        enableRowActions
        renderRowActions={
          ({row}) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton color="primary" component={Link} to={`/lecturers/edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" component={Link} to={`/lecturers/delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )
        }
      />
    </div>
  );
};

export default ListLecturer;
