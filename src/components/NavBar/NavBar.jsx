import { Box, Button, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import { useSelector } from 'react-redux'
import './NavBar.css'

const pages = [
  {
    name: 'GITHUB',
    path: '/'
  },
  {
    name: 'REPOS',
    path: '/repos'
  },
]

export const NavBar = () => {
    const { token } = useSelector(store => store.user)
    return (
        <AppBar position="static" className="app__navbar-nb">
            <Toolbar disableGutters className="app__toolbar-nb">
              {pages.map((page) => (
                <NavLink key={page.name} to={page.path}>
                  <Button>
                    <Typography color={'white'}>{page.name}</Typography>
                  </Button>
                </NavLink>
              ))}
              <Box className="app__indicator-nb">{token ? '🟢' : '🔴'}</Box>
            </Toolbar>
        </AppBar>
    )
}
