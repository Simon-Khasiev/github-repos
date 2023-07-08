import { Octokit } from "octokit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import './Repos.css'
import { setRepos } from "../../redux/slices/userReposSlice"

export const Repos = () => {
    const {username, token} = useSelector(store => store.user)
    const repos = useSelector(store => store.userRepos.repos)
    const dispatch = useDispatch()

    useEffect(() => {
        if(token){
            const octokit = new Octokit({
                auth: token
            })
            octokit.request(`GET /users/${username}/repos`, {
                username,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
            }).then(res => {
                if(res.status === 200) {
                    dispatch(setRepos(res.data))
                }
            });
        }
    },[dispatch, username, token])
    
    return (
        <>
            { token ? 
                <Box className="box__content-repos">
                    {repos.map(rep => 
                        <NavLink key={rep.id} className="link-repos" to={`/repos/${rep.name}`}>
                            <Box  className="box__item-repos">
                                <Box className="box__name-repos">
                                    <Typography className="tp__repos" color='black'>
                                        {rep.name}
                                    </Typography>
                                    <Typography className="tp__private-repos" fontSize={'11px'} color='white'>
                                        {rep.visibility}
                                    </Typography>
                                </Box>
                                <Box className="box__desc-repos">
                                    <Typography className="tp__repos" color='#1976d2' >
                                        {rep.description}
                                    </Typography>
                                    <Typography className="tp__repos" color='#1976d2'>
                                        {rep.language}
                                    </Typography>
                                </Box>
                                <Box className="box__created-repos">
                                    <Typography fontSize={'11px'} color='#1976d2' >
                                        {rep.created_at.slice(0, 10)}
                                    </Typography>
                                </Box>
                            </Box>
                        </NavLink>
                    )}
                </Box>
                :
                <Box className="box__notfound">
                    <Typography color='red'>USER NOT FOUND</Typography>
                </Box>
            }   
        </>
    )
}
