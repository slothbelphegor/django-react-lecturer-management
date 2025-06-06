import { React, useMemo, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import AxiosInstance from "../../components/AxiosInstance";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MyButton from "../../components/forms/MyButton";
import { MaterialReactTable } from "material-react-table";
import { RoleContext } from "../../components/RoleContext";

const ListSubject = () => {
  const [subjects, setSubjects] = useState([]);
  //const { role } = useContext(RoleContext) ? localStorage.getItem("Role") : "";
  const role = localStorage.getItem("Role") || ""; 
  const getData = () => {
    AxiosInstance.get("subjects/").then((res) => {
      setSubjects(res.data);
    });
  };

  useEffect(() => {
    getData();
    console.log("Role: ", role);
  }, []); // get data on initial load page

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Tên môn học",
      },
      {
        accessorKey: "credits",
        header: "Số tín chỉ",
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        // max length of 50 characters
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value.length > 50 ? value.slice(0, 50) + "..." : value;
        },
      },
    ],
    []
  );
  return (
    <div>
      <Box
        className="topbar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarViewMonthIcon />
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold" }}
            variant="subtitle2"
          >
            Danh sách môn học
          </Typography>
        </Box>
        {role === "education_department" && (
          <Box>
            <MyButton
              type="button"
              label="Thêm môn học"
              onClick={() => {
                window.location.href = `/subjects/create`;
              }}
            />
          </Box>
        )}
      </Box>

      <MaterialReactTable
        columns={columns}
        data={subjects}
        enableRowActions
        positionActionsColumn={"last"}
        renderRowActions={({ row }) =>
          role === "education_department" && (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="primary"
                component={Link}
                to={`/subjects/edit/${row.original.id}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                component={Link}
                to={`/subjects/delete/${row.original.id}`}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )
        }
      />
    </div>
  );
};

export default ListSubject;
