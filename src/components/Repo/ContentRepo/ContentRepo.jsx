import { Octokit } from "octokit"
import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTree } from "../../../redux/slices/currentBranchSlice"
import { ShowTree } from "./ShowTree/ShowTree"

export const ContentRepo = ({nameRepo}) => {
    const { username, token } = useSelector(store => store.user)
    const { tree, url } = useSelector(store => store.curBranch)
    const dispatch = useDispatch()

    useEffect(() => {
        if(url) {
            const octokit = new Octokit ({
                auth: token
            })
            octokit.request(url).then(res => {
                if(res.status === 200) {
                    octokit.request(res.data.commit.tree.url)
                    .then( response =>{
                        if(response.status === 200) {
                            dispatch(setTree(response.data.tree))
                        }
                    })
                }
            })
        }
    },[dispatch, nameRepo, token, username, url])

    return(
        <>
            {
                tree.length > 0 && <ShowTree tree={tree} ml={10}/>
            }
        </>
    )
}