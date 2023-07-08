import { setRepo } from "../../redux/slices/oneRepoSlice"
import { useDispatch, useSelector } from "react-redux"
import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Octokit } from "octokit"


export const Repo = () => {
    const { nameRepo } = useParams()
    const {username, token} = useSelector(store => store.user)
    const repo = useSelector(store => store.repo.repo)
    const dispatch = useDispatch()

    useEffect(() => {
        if(token) {
            const octokit = new Octokit({
                auth: token
              })
              
            octokit.request(`GET /repos/${username}/${nameRepo}`, {
                owner: username,
                repo: nameRepo,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
            }).then(res => {
                if(res.status === 200) {
                    console.log(res.data);
                    dispatch(setRepo(res.data))
                    octokit.request(`GET /repos/${username}/${nameRepo}/branches`, {
                        owner: username,
                        repo: nameRepo,
                        headers: {
                          'X-GitHub-Api-Version': '2022-11-28'
                        }
                    }).then(res => console.log(res.data))
                }
            })
        }
        return (() => {
            dispatch(setRepo({}))
        })
    }, [dispatch, token, username, nameRepo])
    return (
        <>
            { repo ? 
                <Box>{repo?.name}</Box> 
                :
                <Box className="box__notfound">
                    <Typography color='red'>REPO NOT FOUND</Typography>
                </Box>
            }
        </>
    )
}
