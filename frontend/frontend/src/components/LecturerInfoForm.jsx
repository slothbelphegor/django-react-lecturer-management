import { React, useState } from "react";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import AddNewIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import MyTextField from "./forms/MyTextField";
import MyButton from "./forms/MyButton";
import MyDescriptionField from "./forms/MyDescriptionField";
import MySelectField from "./forms/MySelectField";
import MyDateTimeField from "./forms/MyDateTimeField";
import MyMultiSelectField from "./forms/MyMultiSelectField";
import MyMessage from "./Message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import AxiosInstance from "./AxiosInstance";


export default function LecturerInfoForm( {lecturer, submission} ) {
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
      { id: "title1", value: "GS." },
      { id: "title2", value: "PGS." },
      { id: "title3", value: "" },
    ];
  
    const quotaCodeOptions = [
      { id: "quota1", value: "Giảng viên cao cấp (hạng I) - V.07.01.01" },
      { id: "quota2", value: "Giảng viên chính (hạng II) - V.07.01.02" },
      { id: "quota3", value: "Giảng viên (hạng III) - V.07.01.03" },
      { id: "quota4", value: "Trợ giảng (hạng IV) - V.07.01.23" },
      {
        id: "quota5",
        value: "Giảng viên cao đẳng sư phạm cao cấp (hạng I) - V.07.08.20",
      },
      {
        id: "quota6",
        value: "Giảng viên cao đẳng sư phạm chính (hạng II) - V.07.08.21",
      },
      {
        id: "quota7",
        value: "Giảng viên cao đẳng sư phạm (hạng III) - V.07.08.22",
      },
      { id: "quota8", value: "Giáo viên dự bị đại học hạng I - V.07.07.17" },
      {
        id: "quota9",
        value: "Giáo viên dự bị đại học hạng II - V.07.07.18",
      },
      {
        id: "quota10",
        value: "Giáo viên dự bị đại học hạng III - V.07.07.19",
      },
      {
        id: "quota11",
        value: "Giáo viên trung học cơ sở hạng I - V.07.04.30",
      },
      {
        id: "quota12",
        value: "Giáo viên trung học cơ sở hạng II - V.07.04.31",
      },
      {
        id: "quota13",
        value: "Giáo viên trung học cơ sở hạng III - V.07.04.32",
      },
      {
        id: "quota14",
        value: "Giáo viên trung học phổ thông hạng I - V.07.05.13",
      },
      {
        id: "quota15",
        value: "Giáo viên trung học phổ thông hạng II - V.07.05.14",
      },
      {
        id: "quota16",
        value: "Giáo viên trung học phổ thông hạng III - V.07.05.15",
      },
      {
        id: "quota17",
        value: "Giảng viên giáo dục nghề nghiệp cao cấp - V.09.02.01",
      },
      {
        id: "quota18",
        value: "Giảng viên giáo dục nghề nghiệp chính - V.09.02.02",
      },
      {
        id: "quota19",
        value: "Giảng viên giáo dục nghề nghiệp lý thuyết - V.09.02.03",
      },
      {
        id: "quota20",
        value: "Giảng viên giáo dục nghề nghiệp thực hành - V.09.02.04",
      },
      {
        id: "quota21",
        value: "Giáo viên giáo dục nghề nghiệp cao cấp - V.09.02.05",
      },
      {
        id: "quota22",
        value: "Giáo viên giáo dục nghề nghiệp chính - V.09.02.06",
      },
      {
        id: "quota23",
        value: "Giáo viên giáo dục nghề nghiệp lý thuyết - V.09.02.07",
      },
      {
        id: "quota24",
        value: "Giáo viên giáo dục nghề nghiệp thực hành - V.09.02.08",
      },
      {
        id: "quota25",
        value: "Giáo viên giáo dục nghề nghiệp - V.09.02.09",
      },
      { id: "quota26", value: "Viên chức giáo vụ - V.07.07.21" },
      {
        id: "quota27",
        value: "Viên chức hỗ trợ giáo dục người khuyết tật - V.07.06.16",
      },
      { id: "quota28", value: "Khác (nhập cụ thể)" },
    ];

    const recommenderOptions = lecturers.map((lecturer) => ({
      id: lecturer.id,
      value: lecturer.id,
      showValue: `${lecturer.name} - ${lecturer.workplace}`,
    }));
    
    const getData = () => {
        AxiosInstance.get("subjects/").then((res) => {
            setSubjects(res.data);
            });
        AxiosInstance.get("lecturers/").then((res) => {
            const lecturersWithNone = [
                ...res.data,
            ];
            setLecturers(res.data);
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
          is: (value) => value === "Khác (nhập cụ thể)", // Ensure the condition checks for the exact value
          then: () => yup.string().required("Chưa nhập ngạch viên chức khác"),
          otherwise: () => yup.string().notRequired(), // Ensure the field is not required if the condition is not met
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
    const { handleSubmit, control, register, getValues, watch, reset, setValue } = useForm({
        resolver: resolvedSchema,
        defaultValues: {
          degree: degreeOptions[0].value,
          workExperiences: [],
          researches: [],
          publishedWorks: [],
          title: titleOptions[2].value,
          quota_code: quotaCodeOptions[2].value,
          degree_granted_at_CN: format(new Date(), "yyyy-MM"),
          degree_granted_at_ThS: format(new Date(), "yyyy-MM"),
          degree_granted_at_TS: format(new Date(), "yyyy-MM"),
          from_CN: format(new Date(), "yyyy-MM"),
          to_CN: format(new Date(), "yyyy-MM"),
          from_ThS: format(new Date(), "yyyy-MM"),
          to_ThS: format(new Date(), "yyyy-MM"),
          from_TS: format(new Date(), "yyyy-MM"),
          to_TS: format(new Date(), "yyyy-MM"),
        },

      });

    function convertDateFormat(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
      return `${year}-${month}`;
    }
    
    useEffect(() => {
      getData();
      if (lecturer && lecturer.exp_academic !== undefined) {
        const formValues = {
          name: lecturer.name,
          email: lecturer.email,
          phone: lecturer.phone_number,
          gender: lecturer.gender,
          dob: lecturer.dob,
          ethnic: lecturer.ethnic,
          hometown: lecturer.hometown,
          religion: lecturer.religion,
          degree: lecturer.degree || degreeOptions[0].value,
          title: lecturer.title || titleOptions[2].value,
          title_detail: lecturer.title_detail,
          title_granted_at: convertDateFormat(lecturer?.title_granted_at),
          address: lecturer.address,
          work_position: lecturer.work_position,
          workplace: lecturer.workplace,
          quota_code: quotaCodeOptions.find((option) => option.value === lecturer.quota_code)?.value || quotaCodeOptions[27].value,
          // quota_code: lecturer.quota_code || quotaCodeOptions[2].value,
          other_quota_code: lecturer.quota_code,
          salary_coefficient: lecturer.salary_coefficient,
          salary_coefficient_granted_at: convertDateFormat(
            lecturer.salary_coefficient_granted_at
          ),
          recruited_at: lecturer.recruited_at,
          years_of_experience: lecturer.years_of_experience,
          exp_language: lecturer.exp_language,
          exp_computer: lecturer.exp_computer,
          workExperiences: lecturer.exp_work,
          researches: lecturer.researches,
          publishedWorks: lecturer.published_works,
          subjects: lecturer.subjects,
          recommender: lecturer.recommender
            ? recommenderOptions.find((option) => option.id === lecturer.recommender)?.value || ""
            : "",
        };
        console.log(formValues.recommender);
        // Add experience work fields dynamically
        formValues["workExperiences"] = lecturer.exp_work.map((exp) => ({
          organization: exp.organization,
          from: convertDateFormat(exp.from),
          to: convertDateFormat(exp.to),
        }));
        // Add research fields dynamically
        formValues["researches"] = lecturer.researches.map((research) => ({
          name: research.name,
          year: research.year,
          position: research.position,
          level: research.level,
        }));
        // Add published works fields dynamically
        formValues["publishedWorks"] = lecturer.published_works.map((work) => ({
          name: work.name,
          year: work.year,
          place: work.place,
        }));
        
        // Add academic experience fields dynamically
        for (const degree in lecturer.exp_academic) {
          if (lecturer.exp_academic[degree] === null) {
            continue;
          }
          const currentDegree = degreeOptions.find(
            (option) => option.abbreviation === degree
          );
          if (currentDegree !== undefined) {
            formValues[`school_name_${currentDegree.abbreviation}`] =
              lecturer.exp_academic[currentDegree.abbreviation].school_name;
            formValues[`major_${currentDegree.abbreviation}`] =
              lecturer.exp_academic[currentDegree.abbreviation].major;
            formValues[`from_${currentDegree.abbreviation}`] = convertDateFormat(
              lecturer.exp_academic[currentDegree.abbreviation].from
            );
            formValues[`to_${currentDegree.abbreviation}`] = convertDateFormat(
              lecturer.exp_academic[currentDegree.abbreviation].to
            );
            formValues[
              `degree_granted_at_${currentDegree.abbreviation}`
            ] = convertDateFormat(
              lecturer.exp_academic[currentDegree.abbreviation].degree_granted_at
            );
          }
        }
    
        // Reset the form with the accumulated values
        reset(formValues);
      }
    }, [lecturer, reset]);      
    
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

  return (
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
                  (selectedDegree !== undefined && 
                  degree.id <=
                  degreeOptions.find(
                    (option) => option.value === selectedDegree
                  ).id)
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
              options={recommenderOptions}
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
  )
}
    
