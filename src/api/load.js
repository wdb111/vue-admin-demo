import https from '../https'

export function getUsers(data){
    return https({
        url: data.username,
        method: 'post'
    })
}