import AxiosInstance from "../../components/AxiosInstance";
import { React, useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import AddNewIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import MyTextField from "../../components/forms/MyTextField";
import MySelectField from "../../components/forms/MySelectField";
import MyButton from "../../components/forms/MyButton";
import MyDescriptionField from "../../components/forms/MyDescriptionField";
import MyMessage from "../../components/Message";
import MyMultiSelectField from "../../components/forms/MyMultiSelectField";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyDateTimeField from "../../components/forms/MyDateTimeField";

const CreateLecturer = () => {
  const [subjects, setSubjects] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [quotaCode, setQuotaCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const degreeOptions = [
    { id: 1, value: "Cử nhân", abbreviation: "CN" },
    { id: 2, value: "Thạc sĩ", abbreviation: "ThS" },
    { id: 3, value: "Tiến sĩ", abbreviation: "TS" },
  ];

  const titleOptions = [
    { id: 1, value: "GS." },
    { id: 2, value: "PGS." },
    { id: 3, value: "" },
  ];

  const quotaCodeOptions = [
    { id: 1, value: "Giảng viên cao cấp (hạng I) - V.07.01.01" },
    { id: 2, value: "Giảng viên chính (hạng II) - V.07.01.02" },
    { id: 3, value: "Giảng viên (hạng III) - V.07.01.03" },
    { id: 4, value: "Trợ giảng (hạng IV) - V.07.01.23" },
    {
      id: 5,
      value: "Giảng viên cao đẳng sư phạm cao cấp (hạng I) - V.07.08.20",
    },
    {
      id: 6,
      value: "Giảng viên cao đẳng sư phạm chính (hạng II) - V.07.08.21",
    },
    {
      id: 7,
      value: "Giảng viên cao đẳng sư phạm (hạng III) - V.07.08.22",
    },
    { id: 8, value: "Giáo viên dự bị đại học hạng I - V.07.07.17" },
    {
      id: 9,
      value: "Giáo viên dự bị đại học hạng II - V.07.07.18",
    },
    {
      id: 10,
      value: "Giáo viên dự bị đại học hạng III - V.07.07.19",
    },
    {
      id: 11,
      value: "Giáo viên trung học cơ sở hạng I - V.07.04.30",
    },
    {
      id: 12,
      value: "Giáo viên trung học cơ sở hạng II - V.07.04.31",
    },
    {
      id: 13,
      value: "Giáo viên trung học cơ sở hạng III - V.07.04.32",
    },
    {
      id: 14,
      value: "Giáo viên trung học phổ thông hạng I - V.07.05.13",
    },
    {
      id: 15,
      value: "Giáo viên trung học phổ thông hạng II - V.07.05.14",
    },
    {
      id: 16,
      value: "Giáo viên trung học phổ thông hạng III - V.07.05.15",
    },
    {
      id: 17,
      value: "Giảng viên giáo dục nghề nghiệp cao cấp - V.09.02.01",
    },
    {
      id: 18,
      value: "Giảng viên giáo dục nghề nghiệp chính - V.09.02.02",
    },
    {
      id: 19,
      value: "Giảng viên giáo dục nghề nghiệp lý thuyết - V.09.02.03",
    },
    {
      id: 20,
      value: "Giảng viên giáo dục nghề nghiệp thực hành - V.09.02.04",
    },
    {
      id: 21,
      value: "Giáo viên giáo dục nghề nghiệp cao cấp - V.09.02.05",
    },
    {
      id: 22,
      value: "Giáo viên giáo dục nghề nghiệp chính - V.09.02.06",
    },
    {
      id: 23,
      value: "Giáo viên giáo dục nghề nghiệp lý thuyết - V.09.02.07",
    },
    {
      id: 24,
      value: "Giáo viên giáo dục nghề nghiệp thực hành - V.09.02.08",
    },
    {
      id: 25,
      value: "Giáo viên giáo dục nghề nghiệp - V.09.02.09",
    },
    { id: 26, value: "Viên chức giáo vụ - V.07.07.21" },
    {
      id: 27,
      value: "Viên chức hỗ trợ giáo dục người khuyết tật - V.07.06.16",
    },
    { id: 28, value: "Khác (nhập cụ thể)" },
  ];

  const getData = () => {
    AxiosInstance.get("subjects/").then((res) => {
      setSubjects(res.data);
    });
    AxiosInstance.get("lecturers/").then((res) => {
      const lecturersWithNone = [
        ...res.data,
      ];
      setLecturers(lecturersWithNone);
    });
  };

  const schema = yup.object().shape({
    name: yup.string().required("Chưa nhập họ tên"),
    email: yup.string().email("Email không hợp lệ").required("Chưa nhập email"),
    phone: yup
      .string()
      .required("Chưa nhập số điện thoại")
      .matches(/^\+?[0-9]{7,14}$/, "Số điện thoại không hợp lệ"),
    ethnic: yup.string().required("Chưa nhập dân tộc"),
    gender: yup.string().required("Chưa chọn giới tính"),
    religion: yup.string().required("Chưa nhập tôn giáo"),
    hometown: yup.string().required("Chưa nhập quê quán"),
    dob: yup.date().typeError("Chưa nhập ngày tháng năm sinh"),
    title_detail: yup.string().required("Chưa nhập chức danh"),
    title_granted_at: yup.date().typeError("Chưa chọn năm tháng bổ nhiệm"),
    address: yup.string().required("Chưa nhập nơi ở hiện nay"),
    workplace: yup.string().required("Chưa nhập đơn vị công tác"),
    work_position: yup.string().required("Chưa nhập chức vụ"),
    quota_code: yup.string().required("Chưa nhập ngạch viên chức"),
    other_quota_code: yup.string().when("quota_code", {
      is: "Khác (nhập cụ thể)",
      then: yup.string().required("Chưa nhập ngạch viên chức khác"),
    }),
    salary_coefficient: yup.number().typeError("Hệ số lương không hợp lệ"),
    salary_coefficient_granted_at: yup
      .date()
      .typeError("Chưa chọn tháng năm xếp hệ số lương"),
    recruited_at: yup
      .date()
      .typeError("Chưa chọn ngày tháng năm được tuyển dụng"),
    years_of_experience: yup
      .number()
      .typeError("Thâm niên giảng dạy không hợp lệ"),
    school_name_CN: yup.string().required("Chưa nhập nơi đào tạo"),
    major_CN: yup.string().required("Chưa nhập chuyên ngành"),
    from_CN: yup.date().typeError("Chưa chọn tháng năm"),
    to_CN: yup.date().typeError("Chưa chọn tháng năm"),
    degree_granted_at_CN: yup
      .date()
      .typeError("Chưa chọn tháng năm nhận bằng tốt nghiệp"),
    school_name_ThS: yup.string().when(
      "degree",
      (degree, schema) => {
        if (degree === "Thạc sĩ" || degree === "Tiến sĩ") {
          return schema.required("Chưa nhập nơi đào tạo");
        }
        return schema.notRequired();
      }
    ),
    major_ThS: yup.string().when(
      "degree",
      (degree, schema) => {
        if (degree === "Thạc sĩ" || degree === "Tiến sĩ") {
          return schema.required("Chưa nhập chuyên ngành");
        }
        return schema.notRequired();
      }
    ),
    from_ThS: yup.date().when(
      "degree",
      (degree, schema) => {
        if (degree === "Thạc sĩ" || degree === "Tiến sĩ") {
          return schema.typeError("Chưa chọn tháng năm");
        }
        return schema.notRequired();
      }
    ),
    to_ThS: yup.date().when(
      "degree",
      (degree, schema) => {
        if (degree === "Thạc sĩ" || degree === "Tiến sĩ") {
          return schema.typeError("Chưa chọn tháng năm");
        }
        return schema.notRequired();
      }
    ),
    degree_granted_at_ThS: yup
      .date()
      .when(
        "degree",
        (degree, schema) => {
          if (degree === "Thạc sĩ" || degree === "Tiến sĩ") {
            return schema.typeError("Chưa chọn tháng năm nhận bằng tốt nghiệp");
          }
          return schema.notRequired();
        }
      ),
    school_name_TS: yup.string().when(
      "degree",
      (degree, schema) => {
        if (degree === "Tiến sĩ") {
          return schema.required("Chưa nhập nơi đào tạo");
        }
        return schema.notRequired();
      }
    ),
    major_TS: yup.string().when(
      "degree",
      (degree, schema) => {
        if (degree === "Tiến sĩ") {
          return schema.required("Chưa nhập chuyên ngành");
        }
        return schema.notRequired();
      }
    ),
    from_TS: yup.date().when(
      "degree",
      (degree, schema) => {
        if (degree === "Tiến sĩ") {
          return schema.typeError("Chưa chọn tháng năm");
        }
        return schema.notRequired();
      }
    ),
    to_TS: yup.date().when(
      "degree",
      (degree, schema) => {
        if (degree === "Tiến sĩ") {
          return schema.typeError("Chưa chọn tháng năm");
        }
        return schema.notRequired();
      }
    ),
    degree_granted_at_TS: yup
      .date()
      .when(
        "degree",
        (degree, schema) => {
          if (degree === "Tiến sĩ") {
            return schema.typeError("Chưa chọn tháng năm nhận bằng tốt nghiệp");
          }
          return schema.notRequired();
        }
      ),
    exp_language: yup.string().typeError("Thông tin không hợp lệ"),
    exp_computer: yup.string().typeError("Chưa nhập trình độ tin học"),
    workExperiences: yup.array().of(
      yup.object().shape({
        from: yup.date().typeError("Chưa chọn tháng năm"),
        to: yup.date().typeError("Chưa chọn tháng năm"),
        organization: yup.string().required("Chưa nhập đơn vị công tác"),
      })
    ),
    publishedWorks: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Chưa nhập tên công trình"),
        year: yup.string().required("Chưa nhập năm công bố"),
        place: yup.string().required("Chưa nhập nơi công bố"),
      })
    ),
    researches: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Chưa nhập tên đề tài nghiên cứu"),
        year: yup.string().required("Chưa nhập năm hoàn thành"),
        position: yup
          .string()
          .required("Chưa nhập trách nhiệm tham gia đề tài"),
        level: yup.string().required("Chưa chọn cấp đề tài"),
      })
    ),
    subjects: yup.array().required("Chưa chọn môn học"),
  });

  const resolvedSchema = yupResolver(schema);
  const { handleSubmit, control, register, getValues, watch } = useForm({
    resolver: resolvedSchema,
    defaultValues: {
      degree: degreeOptions[0].value,
      workExperiences: [],
      researches: [],
      publishedWorks: [],
      title: titleOptions[2].value,
      quota_code: quotaCodeOptions[2].value,
      degree_granted_at_ThS: new Date(),
      degree_granted_at_CN: new Date(),
      degree_granted_at_TS: new Date(),
      from_TS: new Date(),
      from_CN: new Date(),
      from_ThS: new Date(),
      to_TS: new Date(),
      to_CN: new Date(),
      to_ThS: new Date(),
    },
  });

  // Field array cho quá trình công tác
  const {
    fields: workExperiences,
    append: appendWorkExperiences,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: "workExperiences",
  });

  // Field array cho nghiên cứu khoa học
  const {
    fields: researches,
    append: appendResearches,
    remove: removeResearches,
  } = useFieldArray({
    control,
    name: "researches",
  });

  // Field array cho công trình khoa học
  const {
    fields: publishedWorks,
    append: appendPublishedWorks,
    remove: removePublishedWorks,
  } = useFieldArray({
    control,
    name: "publishedWorks",
  });

  // Các trường cần quan sát sự thay đổi (giống state)
  const selectedDegree = watch("degree");
  const selectedQuotaCode = watch("quota_code");

  const checkQuotaCode = () => {
    if (selectedQuotaCode === "Khác (nhập cụ thể)") {
      return "block";
    } else {
      return "none";
    }
  };

  const getDegreeAbbreviation = () => {
    switch (selectedDegree) {
      case "Cử nhân":
        return "CN.";
      case "Thạc sĩ":
        return "ThS.";
      case "Tiến sĩ":
        return "TS.";
      default:
        return "";
    }
  };
  
  // Gửi dữ liệu về backend
  const submission = (data) => {
    console.log("Form submitted with data:", data);
    const academics = {
      CN: {
        school_name: data.school_name_CN,
        major: data.major_CN,
        from: new Date(data.from_CN).toISOString().split("T")[0],
        to: new Date(data.to_CN).toISOString().split("T")[0],
        degree_granted_at: new Date(data.degree_granted_at_CN).toISOString().split("T")[0],
      },
      // include this only when degree is ThS or TS
      ThS: data.degree === "Thạc sĩ" || data.degree === "Tiến sĩ" ? {
        school_name: data.school_name_ThS,
        major: data.major_ThS,
        from: data.from_ThS,
        to: data.to_ThS,
        degree_granted_at: data.degree_granted_at_ThS,
      } : null,
      TS: data.degree === "Tiến sĩ" ? {
        school_name: data.school_name_TS,
        major: data.major_TS,
        from: data.from_TS,
        to: data.to_TS,
        degree_granted_at: data.degree_granted_at_TS,
      } : null,
    }
    const sentData = {
      name: data.name,
      email: data.email,
      phone_number: data.phone,
      gender: data.gender,
      dob: new Date(data.dob).toISOString().split("T")[0],
      ethnic: data.ethnic,
      religion: data.religion,
      hometown: data.hometown,
      degree: data.degree,
      title: data.title,
      title_detail: data.title_detail,
      title_granted_at: new Date(data.title_granted_at).toISOString().split("T")[0],
      address: data.address,
      work_position: data.work_position,
      workplace: data.workplace,
      quota_code: data.quota_code === "Khác (nhập cụ thể)" ? data.other_quota_code : data.quota_code,
      salary_coefficient: data.salary_coefficient,
      salary_coefficient_granted_at: new Date(data.salary_coefficient_granted_at).toISOString().split("T")[0],
      recruited_at: new Date(data.recruited_at).toISOString().split("T")[0],
      years_of_experience: data.years_of_experience,
      exp_language: data.exp_language,
      exp_computer: data.exp_computer,
      exp_work: data.workExperiences,
      exp_academic: academics,
      researches: data.researches,
      published_works: data.publishedWorks,
      subjects: data.subjects,
      recommender: data.recommender,
    }
    console.log("Data to be sent:", sentData);
    AxiosInstance.post("lecturers/",sentData)
      .then((res) => {
        console.log(res.data);
        setIsError(false);
        setMessage("Lecturer created successfully.");
        setTimeout(() => {
          // Refresh the page
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        setMessage("An error occurred while creating the lecturer.");
        setIsError(true);
        console.error('Error details:', error.response.data);
      })
      .finally(() => {
        setShowMessage(true);
      });
  };
  useEffect(() => {
    getData();
  }, []); // get data on initial load page

  return (
    <div>
      <Box className="topbar">
        <AddNewIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          Add a new lecturer
        </Typography>
      </Box>
      {showMessage ? (
        <MyMessage
          text={message}
          color={isError ? "#EC5A76" : "green"}
          position={"static"}
        />
      ) : null}
      <form onSubmit={handleSubmit(submission,
        (errors) => console.log("Validation Errors:", errors)
      )}>
        <Box
          className="formBox"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(1, 1fr)",
          }}
        >
          <Box
            className="formArea"
            sx={{ gridColumn: "span 2", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Họ tên"}
              name="name"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MySelectField
              options={[
                { id: 1, value: "Nam" },
                { id: 2, value: "Nữ" },
              ]}
              className="formField"
              label={"Giới tính"}
              name="gender"
              control={control}
            />
          </Box>

          <Box
            className="formArea"
            sx={{ gridColumn: "span 2", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Email"}
              name="email"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Số điện thoại"}
              name="phone"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyDateTimeField
              className="formField"
              label={"Ngày tháng năm sinh"}
              name="dob"
              control={control}
              type="date"
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Dân tộc"}
              name="ethnic"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Tôn giáo"}
              name="religion"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 3", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Quê quán"}
              name="hometown"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MySelectField
              options={degreeOptions}
              className="formField"
              label={"Học vị cao nhất"}
              name="degree"
              control={control}
              {...register("degree")}
            />
          </Box>
          <Box
            className="formArea"
            sx={{
              gridColumn: "span 1",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gridTemplateRows: "repeat(1, 1fr)",
            }}
          >
            <MySelectField
              sx={{ gridColumn: "span 1", width: "100%" }}
              options={titleOptions}
              className="formField"
              label={"Học hàm"}
              name="title"
              control={control}
            />
            <MyTextField
              sx={{ gridColumn: "span 1", width: "100%" }}
              className="formField"
              label={"Chức danh khoa học"}
              name="title_detail"
              control={control}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {getDegreeAbbreviation()}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyDateTimeField
              className="formField"
              label={"Năm tháng bổ nhiệm"}
              name="title_granted_at"
              type="month"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 3", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Nơi ở hiện nay"}
              name="address"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 2", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Đơn vị công tác"}
              name="workplace"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Chức vụ"}
              name="work_position"
              control={control}
            />
          </Box>

          <Box
            className="formArea"
            sx={{
              gridColumn: "span 3",
              width: "100%",
              marginBottom:
                getValues("quota_code") === "Khác (nhập cụ thể)"
                  ? "0px"
                  : "20px",
              paddingBottom:
                getValues("quota_code") === "Khác (nhập cụ thể)"
                  ? "0px"
                  : "20px",
            }}
          >
            <MySelectField
              options={quotaCodeOptions}
              className="formField"
              label={"Ngạch viên chức hiện nay - Mã số ngạch"}
              name="quota_code"
              {...register("quota_code")}
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{
              gridColumn: "span 3",
              width: "100%",
              marginTop: "0px",
              paddingTop: "0px",
              display: checkQuotaCode(),
            }}
          >
            <MyTextField
              className="formField"
              label={"Nhập ngạch viên chức - mã ngạch cụ thể"}
              name="other_quota_code"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Hệ số lương hiện hưởng"}
              name="salary_coefficient"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyDateTimeField
              type="month"
              className="formField"
              label={"Tháng năm xếp hệ số lương hiện hưởng"}
              name="salary_coefficient_granted_at"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyDateTimeField
              type="date"
              className="formField"
              label={"Ngày tháng năm được tuyển dụng vào biên chế"}
              name="recruited_at"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          >
            <MyTextField
              className="formField"
              label={"Thâm niên giảng dạy ĐH, CĐ"}
              name="years_of_experience"
              control={control}
            />
          </Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          ></Box>
          <Box
            className="formArea"
            sx={{ gridColumn: "span 1", width: "100%" }}
          ></Box>
          <Box
            className="formArea"
            sx={{
              gridColumn: "span 3",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography sx={{ width: "100%", fontWeight: "bold" }}>
              <span>Quá trình đào tạo:</span>
            </Typography>
            {degreeOptions.map((degree) => (
              <Box
                className="formArea"
                sx={{
                  width: "100%",
                  // if id is smaller than the selected degree id, display it
                  // else display none
                  display:
                    degree.id <=
                    degreeOptions.find(
                      (option) => option.value === selectedDegree
                    ).id
                      ? "grid"
                      : "none",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gridTemplateRows: "0.5fr 1fr 1fr",
                  gap: "10px",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                }}
                key={degree.id}
              >
                <Typography
                  sx={{
                    width: "100%",
                    height: "30%",
                    fontWeight: "bold",
                    gridColumn: "1 / -1",
                  }}
                >
                  {degree.value}:
                </Typography>
                <MyTextField
                  sx={{ gridColumn: "1 / span 2", gridRow: "2 / 3" }}
                  className="formField"
                  label={"Nơi đào tạo"}
                  name={`school_name_${degree.abbreviation}`}
                  control={control}
                />
                <MyTextField
                  sx={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}
                  className="formField"
                  label={"Chuyên ngành"}
                  name={`major_${degree.abbreviation}`}
                  control={control}
                />
                <MyDateTimeField
                  sx={{ gridColumn: "1 / 2", gridRow: "3 / 4" }}
                  type="month"
                  className="formField"
                  label={"Từ"}
                  name={`from_${degree.abbreviation}`}
                  control={control}
                />
                <MyDateTimeField
                  sx={{ gridColumn: "2 / span 1", gridRow: "3 / 4" }}
                  type="month"
                  className="formField"
                  label={"Đến"}
                  name={`to_${degree.abbreviation}`}
                  control={control}
                />
                <MyDateTimeField
                  sx={{ gridColumn: "3 / span 1", gridRow: "3 / 4" }}
                  type="month"
                  className="formField"
                  label={"Tháng năm nhận bằng tốt nghiệp"}
                  name={`degree_granted_at_${degree.abbreviation}`}
                  control={control}
                />
              </Box>
            ))}
          </Box>
          <Box
            className="formArea"
            sx={{
              gridColumn: "span 3",
              width: "100%",
            }}
          >
            <MyDescriptionField
              label={"Trình độ ngoại ngữ (Tiếng, Bằng cấp)"}
              name={"exp_language"}
              className="formField"
              control={control}
              rows={2}
            />
          </Box>
          <Box
            className="formArea"
            sx={{
              gridColumn: "span 3",
              width: "100%",
            }}
          >
            <MyTextField
              label={"Trình độ tin học (Bằng cấp)"}
              name={"exp_computer"}
              className="formField"
              control={control}
            />
          </Box>

          <Box
            className="formArea"
            sx={{
              gridColumn: "span 3",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ width: "100%", fontWeight: "bold" }}>
              <span>Quá trình công tác:</span>
            </Typography>
            {workExperiences.map((field, index) => (
              <Box
                className="formArea"
                key={field.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "4fr 4fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gap: "2px",
                  width: "100%",
                }}
              >
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "1 / 2",
                    gridRow: "1 / 2",
                    padding: "3px",
                  }}
                >
                  <MyDateTimeField
                    type="month"
                    name={`workExperiences.${index}.from`}
                    label="Từ tháng"
                    control={control}
                  />
                </Box>
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "2 / 3",
                    gridRow: "1 / 2",
                    padding: "3px",
                  }}
                >
                  <MyDateTimeField
                    type="month"
                    name={`workExperiences.${index}.to`}
                    label="Đến tháng"
                    control={control}
                  />
                </Box>

                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "1 / 3",
                    gridRow: "2 / 3",
                    padding: "3px",
                  }}
                >
                  <MyTextField
                    sx={{
                      width: "100%",
                    }}
                    name={`workExperiences.${index}.organization`}
                    label="Chức vụ, đơn vị công tác"
                    control={control}
                  />
                </Box>

                {/* Nút xóa */}
                <IconButton
                  color="error"
                  onClick={() => removeWorkExperience(index)}
                  sx={{
                    mt: "4px",
                    gridColumn: "3 / 4",
                    gridRow: "1 / 3",
                    width: "100%",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <MyButton
              variant="outlined"
              label={"Thêm giai đoạn"}
              onClick={() =>
                appendWorkExperiences({ from: "", to: "", organization: "" })
              }
            ></MyButton>
          </Box>

          <Box
            className="formArea"
            sx={{
              gridColumn: "span 3",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ width: "100%", fontWeight: "bold" }}>
              <span>Kết quả nghiên cứu khoa học:</span>
            </Typography>
            <Typography sx={{ width: "100%", paddingTop: "10px" }}>
              <span>Những đề tài đã được nghiệm thu:</span>
            </Typography>
            {researches.map((field, index) => (
              <Box
                className="formArea"
                key={field.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "4fr 2fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gap: "2px",
                  width: "100%",
                }}
              >
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "1 / 2",
                    gridRow: "1 / 2",
                    padding: "3px",
                  }}
                >
                  <MyTextField
                    label={"Tên đề tài nghiên cứu"}
                    control={control}
                    name={`researches.${index}.name`}
                  />
                </Box>
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "2 / 3",
                    gridRow: "1 / 2",
                    padding: "3px",
                  }}
                >
                  <MyTextField
                    label={"Năm hoàn thành"}
                    control={control}
                    name={`researches.${index}.year`}
                  />
                </Box>
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "1 / 2",
                    gridRow: "2 / 3",
                    padding: "3px",
                  }}
                >
                  <MyTextField
                    label={"Trách nhiệm tham gia đề tài"}
                    control={control}
                    name={`researches.${index}.position`}
                  />
                </Box>
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "2 / 3",
                    gridRow: "2 / 3",
                    padding: "3px",
                  }}
                >
                  <MySelectField
                    options={[
                      {
                        id: `researches.${index}.level.options.1`,
                        value: "Nhà nước",
                      },
                      {
                        id: `researches.${index}.level.options.2`,
                        value: "Bộ",
                      },
                      {
                        id: `researches.${index}.level.options.3`,
                        value: "Ngành",
                      },
                      {
                        id: `researches.${index}.level.options.4`,
                        value: "Trường",
                      },
                    ]}
                    label={"Đề tài cấp"}
                    control={control}
                    name={`researches.${index}.level`}
                  />
                </Box>
                <IconButton
                  color="error"
                  onClick={() => removeResearches(index)}
                  sx={{
                    mt: "4px",
                    gridColumn: "3 / 4",
                    gridRow: "1 / 3",
                    width: "100%",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <MyButton
              variant="outlined"
              label={"Thêm đề tài nghiên cứu"}
              onClick={() =>
                appendResearches({
                  name: "",
                  year: "",
                  level: "",
                  position: "",
                })
              }
            ></MyButton>
            <Typography sx={{ width: "100%", paddingTop: "10px" }}>
              <span>Các công trình khoa học đã công bố:</span>
            </Typography>
            {publishedWorks.map((field, index) => (
              <Box
                className="formArea"
                key={field.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "5fr 1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gap: "2px",
                  width: "100%",
                }}
              >
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "1 / 2",
                    gridRow: "1 / 2",
                    padding: "3px",
                  }}
                >
                  <MyTextField
                    label={"Tên công trình"}
                    control={control}
                    name={`publishedWorks.${index}.name`}
                  />
                </Box>
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "2 / 3",
                    gridRow: "1 / 2",
                    padding: "3px",
                  }}
                >
                  <MyTextField
                    label={"Năm công bố"}
                    control={control}
                    name={`publishedWorks.${index}.year`}
                  />
                </Box>
                <Box
                  className="formArea"
                  sx={{
                    width: "100%",
                    gridColumn: "1 / 3",
                    gridRow: "2 / 3",
                    padding: "3px",
                  }}
                >
                  <MyTextField
                    label={"Nơi công bố"}
                    control={control}
                    name={`publishedWorks.${index}.place`}
                  />
                </Box>
                <IconButton
                  color="error"
                  onClick={() => removePublishedWorks(index)}
                  sx={{
                    mt: "4px",
                    gridColumn: "3 / 4",
                    gridRow: "1 / 3",
                    width: "100%",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <MyButton
              variant="outlined"
              label={"Thêm công trình"}
              onClick={() =>
                appendPublishedWorks({ name: "", year: "", place: "" })
              }
            ></MyButton>
          </Box>

          <Box
            className="formArea"
            sx={{
              gridColumn: "1 / span 3",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ width: "100%", fontWeight: "bold", paddingBottom: "10px" }}
            >
              <span>Thông tin về công tác thỉnh giảng tại trường:</span>
            </Typography>
            <Box className="formArea" sx={{ width: "100%" }}>
              <MySelectField
                label={"Giảng viên giới thiệu"}
                name="recommender"
                className="formField"
                options={lecturers}
                control={control}
              />
            </Box>
            <Box className="formArea" sx={{ width: "100%" }}>
              <MyMultiSelectField
                sx={{ width: "100%" }}
                label={"Chọn các môn học thỉnh giảng tại trường"}
                name="subjects"
                className="formField"
                options={subjects}
                control={control}
              />
            </Box>
          </Box>

          <Box
            className="formArea"
            sx={{ gridColumn: "1 / span 3", width: "100%" }}
          >
            <MyButton type="submit" fullWidth label={"Submit"}></MyButton>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default CreateLecturer;
