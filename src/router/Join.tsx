/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const JoinForm = styled.div`
`;

const JoinInput = styled.input`
    display: block;
    border: none;
    background-color: #f8f8fa;
    margin-bottom: 7px;
    font-size: 9px;
    width: 150px;
    padding: 7px;
    border-radius: 7px;
`
const JoinBtn = styled.button<{active: boolean}>`
    color: ${props => props.active ? 'rgb(255, 255, 255)' : '#aaa'};
    background-color: ${props => props.active ? 'rgb(51, 102, 255)' : '#f8f8f8'};
    border: 1px solid ${props => props.active ? 'rgb(51, 102, 255)' : '#f8f8f8'};
    padding: 3px;
    border-radius: 7px;
    font-size: 9px;
    width: 164px;
    height: 24px;
`;

export default function Join(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [active, setActive] = useState(false);
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
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
            json.access_token? alert(json.message) : (
                alert("회원가입이 완료되었습니다."),
                navigate('/')
            );
        })
    }

    const validation = () => {
        email.indexOf('@') > 0 && pw.length > 8 ? setActive(true) : setActive(false);
    }

    return(
        <Container>
            <JoinForm>
                <JoinInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value); validation()}} placeholder="이메일"></JoinInput>
                <JoinInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPW(e.target.value); validation()}} placeholder="비밀번호"></JoinInput>
                <JoinBtn active={active} onClick={handleSubmit}>회원가입</JoinBtn>
            </JoinForm> 
        </Container>
    )
}