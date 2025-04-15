import AxiosInstance from "../../components/AxiosInstance"
import { React, useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useForm } from 'react-hook-form'
import { useParams } from "react-router-dom"
import AddNewIcon from "@mui/icons-material/AddBox"
import MyTextField from "../../components/forms/MyTextField"
import MySelectField from "../../components/forms/MySelectField"
import MyButton from "../../components/forms/MyButton"
import MyDescriptionField from "../../components/forms/MyDescriptionField"
import MyMessage from "../../components/Message"
import MyMultiSelectField from "../../components/forms/MyMultiSelectField"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const EditLecturer = () => {
    const params = useParams()
    const lecturer_id = params.id
    const [subjects, setSubjects] = useState([])
    const [lecturers, setLecturers] = useState([])
    const [currentLecturer, setCurrentLecturer] = useState({})
    const [showMessage, setShowMessage] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")

    const getData = () => {
        AxiosInstance.get('subjects/').then((res) => {
            setSubjects(res.data)
        })
        AxiosInstance.get('lecturers/').then((res) => {
            setLecturers(res.data)
        })
        AxiosInstance.get(`lecturers/${lecturer_id}/`).then((res) => {
            setCurrentLecturer(res.data)
            console.log(res.data)
        })
    }

    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Field expected an email address').required('Email is required'),
        phone: yup.string().required('Phone number is required')
                .matches(/^\+?[0-9]{7,14}$/, 'Phone number is not valid'),
    })

    const resolvedSchema = yupResolver(schema)
    const { handleSubmit, control } = useForm({
        resolver: resolvedSchema,
        values: {
            name: currentLecturer.name,
            email: currentLecturer.email,
            phone: currentLecturer.phone_number,
            subjects: currentLecturer.subjects,
            address: currentLecturer.address,
            recommender: currentLecturer.recommender,
            workplace: currentLecturer.workplace,
        },

    })

    const submission = (data) => {
        AxiosInstance.put(`lecturers/${lecturer_id}/`, {
            name: data.name,
            email: data.email,
            phone_number: data.phone,
            subjects: data.subjects,
            address: data.address, 
            recommender: data.recommender,
            workplace: data.workplace,
            active: true,
        }).then((res) => {
            console.log(res.data)
            setIsError(false)
            setMessage("Lecturer updated successfully.")
        }).catch((error) => {
            setMessage("An error occurred while creating the lecturer.")
            setIsError(true)
            console.error(error)
        }).finally(() => {
            setShowMessage(true)
        });
    }
    useEffect(() => {
        getData();
    }, []) // get data on initial load page

    return (
        <div>
            <Box className="topbar">
                <AddNewIcon />
                <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant="subtitle2">
                    Lecturer details
                </Typography>
            </Box>
            {showMessage ? <MyMessage 
                                text={message} 
                                color={isError ? '#EC5A76' : "green"}
                                position={"static"}/> 
                        : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box className="formBox">
                    <Box className="formArea">
                        <MyTextField
                            className="formField"
                            label={"Name"}
                            name="name"
                            control={control}
                        />
                    </Box>
                    <Box className="formArea">
                        <MyTextField
                            className="formField"
                            label={"Email"}
                            name="email"
                            control={control}
                        />
                    </Box>
                    <Box className="formArea">
                        <MyTextField
                            className="formField"
                            label={"Phone"}
                            name="phone"
                            control={control}
                        />
                    </Box>
                    <Box className="formArea">
                        <MySelectField
                            label={"Recommender"}
                            name="recommender"
                            className="formField"
                            options={lecturers}
                            control={control} />
                    </Box>
                    <Box className="formArea">
                        <MyTextField
                            className="formField"
                            label={"Address"}
                            name="address"
                            control={control}

                        />
                    </Box>
                    <Box className="formArea">
                        <MyDescriptionField
                            className="formField"
                            label={"Workplace"}
                            name="workplace"
                            control={control}
                            rows={4}
                        />
                    </Box>
                    <Box className="formArea">
                        <MyMultiSelectField
                            label={"Subjects"}
                            name="subjects"
                            className="formField"
                            options={subjects}
                            control={control} />
                    </Box>
                    <Box className="formArea">
                        <MyButton type="submit" fullWidth label={"Submit"}></MyButton>
                    </Box>
                </Box>
            </form>

        </div>
    )
}

export default EditLecturer;