import { Box, Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import './UserInfo.css'
import { deleteUser } from "../../../redux/slices/userSlice"

export const UserInfo = () => {
    const {username, token} = useSelector(store => store.user)

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteUser())
    }

    return (
        <Box className="box__content-ui">
            <Typography className="tp__header-ui">ABOUT USER</Typography>
            <Box className="box__rows-ui">
                <Typography className="tp__label-ui">login:</Typography>
                <Typography className="tp__value-ui">{username}</Typography>
            </Box>
            <Box className="box__rows-ui">
                <Typography className="tp__label-ui" >token:</Typography>
                <Typography className="tp__value-ui" title={token}>
                    {token.slice(0, username.length - 3) + '...'}
                </Typography>
            </Box>
            <Button 
                type='button' 
                variant="contained"
                onClick={deleteHandler}
                className="btn__deletedata-ui"
            >
                clear
            </Button>
        </Box>
    )
}
