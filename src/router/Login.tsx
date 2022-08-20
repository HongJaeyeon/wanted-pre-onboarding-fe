/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoginForm = styled.div`
`;

const LoginInput = styled.input`
    display: block;
    border: none;
    background-color: #f8f8fa;
    margin-bottom: 7px;
    font-size: 9px;
    width: 150px;
    padding: 7px;
    border-radius: 7px;
`
const LoginBtn = styled.button<{active: boolean}>`
    color: ${props => props.active ? 'rgb(255, 255, 255)' : '#aaa'};
    background-color: ${props => props.active ? 'rgb(51, 102, 255)' : '#f8f8f8'};
    border: 1px solid ${props => props.active ? 'rgb(51, 102, 255)' : '#f8f8f8'};
    padding: 3px;
    border-radius: 7px;
    font-size: 9px;
    width: 77px;
    height: 24px;
    margin-right: 10px;

`;

const JoinBtn = styled.button`
    padding: 3px;
    border-radius: 7px;
    font-size: 9px;
    width: 77px;
    height: 24px;
    margin-right: 10px;
    color: rgb(51, 102, 255);
    background-color: rgb(255, 255, 255);
    border: 0.5px solid rgb(51, 102, 255);
    `;

export default function Login(){
    const navigate = useNavigate();

    const tokenSave = (jwt:string) => {
        localStorage.setItem('access_token', jwt);
    }

    const [email, setEmail] = useState("");
    const [active, setActive] = useState(false);
    const [pw, setPW] = useState("");
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/auth/signin`, {
            method: "POST",
            headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            },
            body: JSON.stringify({
                email: `${email}`,
                password: `${pw}`,
            }),
        }).then((response) => response.json())
        .then((json) => {
            console.log(json);
            !json.access_token? alert(json.message) : (
                tokenSave(json.access_token),
                navigate('/todo')
            );
        })
    }
    const validation = () => {
        email.indexOf('@') > 0 && pw.length > 8 ? setActive(true) : setActive(false);
        console.log(active);
    }

    // useEffect({
    //     const access_token = localStorage.getItem("access_token"),
    //     access_token? Redirect(todo) : null;
    // },[])
        

    return(
        <Container>
            <LoginForm>
                <LoginInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value); validation()}} placeholder="이메일"></LoginInput>
                <LoginInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPW(e.target.value); validation();}} placeholder="비밀번호"></LoginInput>
                <LoginBtn active={active} onClick={handleSubmit}>로그인</LoginBtn>
                <Link to='/join'><JoinBtn>회원가입</JoinBtn></Link>
            </LoginForm> 
        </Container>
    )
}
