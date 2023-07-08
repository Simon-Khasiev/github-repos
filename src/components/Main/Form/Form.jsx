import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import './Form.css'
import { setUser } from "../../../redux/slices/userSlice"

export const Form = () => {
    const [inputState, setInputState] = useState({username: '', token: ''})
    const [isEmptyInputs, setIsEmptyInputs] = useState(false)
    const navigate = useNavigate()
    const changeHandler = (e) => {
        setInputState(prev=> ({...prev, [e.target.name]: e.target.value}))
    }
    const dispatch = useDispatch()

    const saveHandler = () => {
        if(inputState.token && inputState.username){
            dispatch(setUser(inputState))
            setInputState({username: '', token: ''})
            navigate('/repos')
        } else {
            setIsEmptyInputs(true)
        }
    }
    return (
        <Box className="box__content-form">
            <TextField 
                label="USERNAME IN GITHUB" 
                variant="standard" 
                name="username"
                className="tf__input-form"
                value={inputState.username}
                onChange={(e) => changeHandler(e)}
            />
            <TextField 
                label="TOKEN" 
                variant="standard"
                name="token"
                className="tf__input-form"
                value={inputState.token} 
                onChange={(e) => changeHandler(e)}
            />
            <Button 
                type='button' 
                variant="contained"
                className="btn__save-form"
                onClick={saveHandler}
            >
                save
            </Button>
            <Typography 
                color='red'
                className="tp__warning-form"
                sx={isEmptyInputs ? {opacity: '1'} : {opacity: '0'}}
            >
                FILL ALL INPUT
            </Typography>
        </Box>
    )
}