/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    width: 7px;
`;

const EditInput = styled.input`
    display: block;
    border: none;
    font-size: 9px;
    width: 150px;
    padding: 7px;
    border-radius: 7px;
`;

const Btn = styled.button`
    margin-left: 8px;
`;

const ID = styled.span`
    display: none;
`;

interface Itodo{
    jwt: string | null,
    id: number,
    isCompleted: boolean,
    todo: string,
}

export default function Todo({jwt, id, isCompleted, todo}: Itodo){
    const [editTodo, setEditTodo] = useState("");
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
                todo: editTodo,
                isCompleted: isCompleted,
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

    const buttonClcik = () => {
        active ? handleEdit() : null;
        setActive(current => !current);
    }

    return(
        <div>
            <CheckBox/>
            { !active ? todo : <form onClick={handleEdit}> <EditInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEditTodo(e.target.value) } value={editTodo}/></form> }
            <Btn onClick={buttonClcik}>수정</Btn>
            <Btn onClick={handleRemove}>삭제</Btn>
        </div>
    )
}

