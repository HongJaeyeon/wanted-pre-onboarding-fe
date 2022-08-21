/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    width: 7px;
`;

const Div = styled.span`
    display: inline-block;
    width: 150px;
`;

const Form = styled.form`
    display: inline;  
`;

const EditInput = styled.input`
    display: inline;
    border: none;
    font-size: 15px;
    width: 150px;
    ::placeholder{
        color: black;
    }
`;

const Btn = styled.button`
    margin-left: 3px;
    font-size: 8px;
`;

interface Itodo{
    jwt: string | null,
    id: number,
    isCompleted: boolean,
    todo: string,
}

export default function Todo({jwt, id, isCompleted, todo}: Itodo){
    const [editTodo, setEditTodo] = useState("");
    const [editIsCompleted, setEditIsCompleted] = useState(isCompleted);
    const [active, setActive] = useState(false);

    const handleEdit = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                'Authorization' : `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
            },
            body: JSON.stringify({
                todo: editTodo? editTodo : todo,
                isCompleted: editIsCompleted? editIsCompleted : isCompleted,
            }),
        })
    }

    const handleRemove = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization' : `Bearer ${jwt}`,
                'Access-Control-Allow-Origin': "*",
            }
        })
    }

    const handleCheck = () => {
        setEditIsCompleted(current=> !current);
        handleEdit();
    }

    const buttonClcik = () => {
        active ? handleEdit() : null;
        setActive(current => !current);
    }

    return(
        <div>
            <CheckBox onChange={handleCheck} checked={editIsCompleted}/>
            { !active ? <Div>{todo}</Div> : <Form onClick={handleEdit}> <EditInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEditTodo(e.target.value)} placeholder={todo} value={editTodo}/></Form> }
            <Btn onClick={buttonClcik}>수정</Btn>
            <Btn onClick={handleRemove}>삭제</Btn>
        </div>
    )
}

