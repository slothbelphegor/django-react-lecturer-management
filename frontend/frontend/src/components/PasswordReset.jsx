import "../App.css"
import { Box } from "@mui/material"
import MyTextField from "./forms/myTextField"
import { React, useState } from "react";
import MyPasswordField from "./forms/MyPasswordField"
import MyButton from "./forms/MyButton"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import AxiosInstance from "./AxiosInstance"
import MyMessage from "./Message"

const PasswordReset = () => {
    const { handleSubmit, control } = useForm()
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false)
    const {token} = useParams()
    const submission = (data) => {
        // What to do when clicking submit
        AxiosInstance.post(`api/password_reset/confirm/`, {
            password: data.password,
            token: token,
        }).then(() => {
            setShowMessage(true)
            setTimeout(() => {
                navigate(`/login`)
            }, 2000)
        }).catch((error) => {
            console.error(error)
        });
    }
    return (
        <div className={"myBackground"}>
            {showMessage ? <MyMessage text={"Password reset successful. Redirecting to login page..."} color={'#69C9AB'} /> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box className={"whiteBox"}>
                    <Box className={"itemBox"}>
                        <Box className={"title"}>
                            Reset Password
                        </Box>
                    </Box>
                    <Box className={"itemBox"}>
                        <MyPasswordField
                            label="Password"
                            name={"password"}
                            control={control} />
                    </Box>
                    <Box className={"itemBox"}>
                        <MyPasswordField
                            label="Confirm Password"
                            name={"password2"}
                            control={control} />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyButton label={"Reset Password"} type={"submit"} />
                    </Box>
                    <Box className={"itemBox"} sx={{ flexDirection: 'column' }}>

                    </Box>
                </Box>
            </form>

        </div>
    )
}

export default PasswordReset;