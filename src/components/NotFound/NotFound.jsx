import { Box, Button, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"

export const NotFound = () => {
    return(
        <Box className="box__notfound">
            <Typography>404 NOT FOUND</Typography>
            <NavLink to='/' style={{marginTop: '10px'}}>
                <Button type="button" variant="contained">
                    back
                </Button>
            </NavLink>
        </Box>
    )
}
