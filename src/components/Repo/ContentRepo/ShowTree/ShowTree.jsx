import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { Octokit } from "octokit"
import { useState } from "react"
import './ShowTree.css'

export const ShowTree = ({tree, ml}) => {
    const { token } = useSelector(store => store.user)
    const [state, setState] = useState({})
    const [show, setShow] = useState({})

    const sendHandler = (url, path) => {
        if(show[path] === path){
            setShow(prev => ({...prev, [path]: ''}))
        }else {
            const octokit = new Octokit({
                auth: token
            })
            octokit.request(url)
            .then(res => setState(prev => ({...prev, [path]: res.data.tree})))
            .then(setShow(prev => ({...prev, [path]: path})))
        }
    }

    return (
        <Box className="box__content-st" sx={{marginLeft: `${ml}px`}}>
            {tree.map(el => {
                if(el.type === 'blob'){
                    return (
                        <Box key={el.url} className="box__item-st">
                            <Typography fontSize={'14px'} className="tp__itemPath-st">
                                {el.path}
                            </Typography>
                            <Typography fontSize={'11px'} className="tp__size-st">
                                {`size: ${el.size}`}
                            </Typography>
                        </Box>
                    )
                } else {
                    return (
                        <Box key={el.url}>
                            <Box className="box__tree-st" onClick={() => sendHandler(el.url, el.path)}>
                                <Typography className="tp__itemPath-st">{el.path}</Typography>
                                <Typography>{show[el.path] === el.path ? '↑' :'↓'}</Typography>
                            </Box>
                            { 
                                show[el.path] === el.path && !!state[el.path]?.length && 
                                <ShowTree tree={state[el.path]} ml={ml + 10}/>
                            }
                        </Box>
                    )
                }
            })}
        </Box>
    )
}
