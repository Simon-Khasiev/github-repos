import { UserInfo } from "./UserInfo/UserInfo"
import { useSelector } from "react-redux"
import { Box } from "@mui/material"
import { Form } from "./Form/Form"
import './Main.css'

export const Main = () => {
    const {token, username} = useSelector(store => store.user)
    return (
        <Box className="app__container-main">
            { username && token ? <UserInfo /> : <Form />}
        </Box>
    )
}
