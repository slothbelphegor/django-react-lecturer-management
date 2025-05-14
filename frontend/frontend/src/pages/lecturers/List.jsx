import { React, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AxiosInstance from "../../components/AxiosInstance";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MyButton from "../../components/forms/MyButton";
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
        header: "Tên",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone_number",
        header: "Số điện thoại",
      },
      {
        accessorKey: "workplace",
        header: "Nơi công tác",
        // max length of 10 characters
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value?.length > 10 ? value.slice(0, 50) + "..." : value;
        },
      },
      {
        accessorKey: "subject_names",
        header: "Môn học",
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
        header: "Người giới thiệu",
        // max length of 10 characters
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value?.length > 10 ? value.slice(0, 50) + "..." : value;
        },
      }
    ]
  , []);
  return (
    <div>
      <Box className="topbar" sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarViewMonthIcon />
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold" }}
            variant="subtitle2"
          >
            Danh sách giảng viên
          </Typography>
        </Box>
        <Box>
          <MyButton
            type="button"
            label="Thêm giảng viên"
            onClick={() => {
              window.location.href = `/lecturers/create`;
            }}

          />

        </Box>
      </Box>

      <MaterialReactTable 
        columns={columns}
        data={lecturers}
        initialState={{ columnVisibility: { 
          id: false,
          address: false,
          phone_number: false,
          email: false,
          "recommender_details.full_name": false,
        } }}
        enableRowActions
        positionActionsColumn={'last'}
        renderRowActions={
          ({row}) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton color="primary" component={Link} to={`/lecturers/edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton color="primary" component={Link} to={`/lecturers/${row.original.id}/evaluations`}>
                <ThumbUpIcon />
              </IconButton>
              <IconButton color="error" component={Link} to={`/lecturers/delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
              
            </Box>
          )
        }
        enableExpanding
        renderDetailPanel={({ row }) => (
          <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">Thông tin chi tiết</Typography>
            <Typography variant="body1">
              <strong>Tên:</strong> {row.original.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {row.original.email}
            </Typography>
            <Typography variant="body1">
              <strong>Số điện thoại:</strong> {row.original.phone_number}
            </Typography>
            <Typography variant="body1">
              <strong>Nơi công tác:</strong> {row.original.workplace}
            </Typography>
            <Typography variant="body1">
              <strong>Môn học:</strong> {row.original.subject_names.join(", ")}
            </Typography>
          </Box>
          
        )}
      />
    </div>
  );
};

export default ListLecturer;
