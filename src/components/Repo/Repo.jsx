import { deleteTree, setBranchUrl } from "../../redux/slices/currentBranchSlice"
import { SelectBranches } from "./SelectBranches/SelectBranches"
import { setBranches } from "../../redux/slices/branchesSlice"
import { setRepo } from "../../redux/slices/oneRepoSlice"
import { ContentRepo } from "./ContentRepo/ContentRepo"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Link, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Octokit } from "octokit"
import './Repo.css'


export const Repo = () => {
    const { nameRepo } = useParams()
    const {username, token} = useSelector(store => store.user)
    const repo = useSelector(store => store.repo.repo)
    const dispatch = useDispatch()

    useEffect(() => {
        return (() => {
            dispatch(deleteTree([]))
            dispatch(setRepo(null))
            dispatch(setBranches([]))
            dispatch(setBranchUrl(''))
        })
    }, [dispatch])

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
                <Box className="box__content-repo">
                    <Box className="tp__name-repo" color='#1976d2'>
                        <Typography>{repo?.name?.toUpperCase()}</Typography>
                        <Link className="link__repo" href={repo?.html_url} target="blanck">
                            <Button>
                                <Typography fontSize={'12px'} color='black'>{repo?.full_name}</Typography>
                            </Button>
                        </Link>
                        <Typography fontSize={'10px'}>{`last changes: ${repo?.updated_at?.slice(0, 10)}`}</Typography>
                    </Box>
                    <SelectBranches nameRepo={nameRepo}/>
                    <ContentRepo nameRepo={nameRepo}/>
                </Box> 
                :
                <Box className="box__notfound">
                    <Typography color='red'>REPO NOT FOUND</Typography>
                </Box>
            }
        </>
    )
}
