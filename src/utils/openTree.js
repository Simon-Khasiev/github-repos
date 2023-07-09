export const openTree = async (tree, octokit)  =>{
    let result = []
    tree.forEach(async (el) => {
        if(el.type === 'tree') {
            const res = await octokit.request(el.url)
            result = [...result, res.data.tree]
        } else {
            result = [...result, el]
        }
    })
    console.log(result);
    return result
}
