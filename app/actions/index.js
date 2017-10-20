import * as actionTypes from '../constants/userinfo'
// import fetch from 'isomorphic-fetch'

function recieveUser(user){
    return {
        type: actionTypes.RECEIVE_USER,
        user
    }
}



export function fetchUser(){
    const token = localStorage.getItem('token');
    if(!token){
        return (dispatch)=>{
            return dispatch(recieveUser({}))
        }
    }
    return (dispatch)=>{
        const content = JSON.stringify({
                access_token: token
            })
        return fetch(`http://localhost:3003/api/user`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                return res.json();
            } else {
                console.log('获取用户失败')
            }
        }).then(json=>{
            dispatch(recieveUser(json))
        })
    }
}



export function logIn(user){
    return {
        type: actionTypes.LOG_IN,
        user
    }
}

export function logOut(){
    return {
        type: actionTypes.LOG_OUT
    }
}