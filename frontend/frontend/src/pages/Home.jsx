import AxiosInstance from "../components/AxiosInstance";
import { React, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MyPieChart from "../components/charts/PieChart";
import PeopleIcon from '@mui/icons-material/People';
import MyBarChart from "../components/charts/BarChart";
import MyChartBox from "../components/charts/ChartBox";

const Home = () => {
  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);
  const [subjectLecturerCount, setSubjectLecturerCount] = useState([]);
  const [degreeLecturerCount, setDegreeLecturerCount] = useState([]);
  const [titleLecturerCount, setTitleLecturerCount] = useState([]);
  const lecturerCountData = [];
  const getData = () => {
    AxiosInstance.get(`subjects/lecturer_count/`)
      .then((res) => {
        setSubjectLecturerCount(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
    AxiosInstance.get(`lecturers/degree_count/`)
      .then((res) => {
        setDegreeLecturerCount(res.data)
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      })
    AxiosInstance.get(`lecturers/title_count/`)
      .then((res) => {
        setTitleLecturerCount(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []); // get data on initial load page
  return (
    <div>
      {/* <MyPieChart myData={subjectLecturerCount?.map((item) => {
                return {
                    value: item.lecturer_count,
                    label: item.name
                }
            })}/> */}
      <Box
        className="topbar"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold" }}
            variant="heading"
          >
            Xin chào, chào mừng bạn đến với hệ thống quản lý giảng viên!
          </Typography>
        </Box>
        <Box></Box>
      </Box>
      <MyChartBox 
        icon1={<PeopleIcon />}
        title1="Số lượng giảng viên theo môn học"
        chart1={<MyBarChart myData={subjectLecturerCount}/>}
        icon2={<PeopleIcon />}
        title2="Tỉ lệ trình độ giảng viên"
        chart2={<MyPieChart myData={degreeLecturerCount?.map((item) => {
          return {
            value: item.percentage,
            label: item.degree
          }
        })}/>}
        icon3={<PeopleIcon/>}
        title3="Tỉ lệ học vị giảng viên"
        chart3={<MyPieChart myData={titleLecturerCount?.map((item) => {
          return {
            value: item.percentage,
            label: item.title
          }
        })}/>}
        />
        

    </div>
  );
};

export default Home;
