import { setBranches } from "../../../redux/slices/branchesSlice"
import { useDispatch, useSelector } from "react-redux"
import { Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material"
import { useEffect } from "react"
import { Octokit } from "octokit"
import { deleteTree, setBranchUrl } from "../../../redux/slices/currentBranchSlice"


export const SelectBranches = ({nameRepo}) => {
    const {username, token} = useSelector(store => store.user)
    const { branches } = useSelector(store => store.branches)
    const { url } = useSelector(store => store.curBranch)

    const dispatch = useDispatch()

    useEffect(() => {
        if(token) {
            const octokit = new Octokit({
                auth: token
            })
            octokit.request(`GET /repos/${username}/${nameRepo}/branches`, {
                owner: username,
                repo: nameRepo,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
            }).then(res => dispatch(setBranches(res.data)))
        }
    },[dispatch, nameRepo, token, username])

    const handleChange = (e) => {
        dispatch(setBranchUrl(e.target.value))
        dispatch(deleteTree())
    }
    return (
        <Box>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="select-label">BRANCH</InputLabel>
                <Select
                    defaultValue=""
                    value={url}
                    id="select"
                    labelId="select-label"
                    label="BRANCH"
                    onChange={(e) => handleChange(e)}
                    autoWidth
                >
                    {branches?.map(branch => 
                        <MenuItem key={branch.name} value={branch.commit.url}>
                            {branch.name}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}
