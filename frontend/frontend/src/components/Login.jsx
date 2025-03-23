import "../App.css"
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { React, useState } from "react";
import MyMessage from "./Message"
import MyTextField from "./forms/myTextField"
import MyPasswordField from "./forms/MyPasswordField"
import MyButton from "./forms/MyButton"
import AxiosInstance from "./AxiosInstance"


const Login = () => {
    const navigate = useNavigate()  // Used for page navigation
    const { handleSubmit, control } = useForm()
    const [showMessage, setShowMessage] = useState(false)
    const submission = (data) => {
        // What to do when clicking submit
        AxiosInstance.post(`login/`, {
            username_or_email: data.username_or_email,
            password: data.password,
        }).then((response) => {
            // What to do after the request
            
            console.log(response)
            // Store the token in localStorage
            localStorage.setItem("Token", response.data.token)
            // Redirect to the home page
            navigate(`/`)
        }).catch((error) => {
            setShowMessage(true)
            console.error(error)
        });
    }
    return (
        <div className={"myBackground"}>
            {showMessage ? <MyMessage text={"Login failed. Please try again."} color={'#EC5A76'}/> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box className={"whiteBox"}>
                    <Box className={"itemBox"}>
                        <Box className={"title"}>
                            Login
                        </Box>
                    </Box>
                    <Box className={"itemBox"}>
                        <MyTextField
                            label="Username or email"
                            name={"username_or_email"}
                            control={control} />
                    </Box>
                    <Box className={"itemBox"}>
                        <MyPasswordField
                            label="Password"
                            name={"password"}
                            control={control} />
                    </Box>
                    <Box className={"itemBox"}>
                        <MyButton label={"Login"}  type={"submit"} />
                    </Box>
                    <Box className={"itemBox"} sx={{flexDirection: 'column'}}>
                        <Link to={"/register"}>
                            Don't have an account? Register
                        </Link>
                        <Link to={"/request/password_reset"}>
                            Forget Password?
                        </Link>
                    </Box>
                </Box>
            </form>

        </div>
    )
}

export default Login;