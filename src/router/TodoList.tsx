/* eslint-disable */
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Todo from "../components/Todo";

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
`;

const TodoForm = styled.form`
`;

const TodoInput = styled.input`
    display: block;
    border: none;
    background-color: #f8f8fa;
    margin-top: 20vh;
    margin-bottom: 7px;
    font-size: 9px;
    width: 200px;
    padding: 7px;
    border-radius: 7px;
`;

const Todos = styled.ul`

`;

export default function TodoList() {
    interface Itodo {
        id: number,
        isCompleted: boolean,
        todo: string, 
        userId: number
    }

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState<Itodo[]>();
    const jwt = localStorage.getItem('access_token');

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BASE_URL}/todos`, {
            method: "GET",
            headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': "*",
            },

        }).then((response) => response.json())
        .then((json) => {
            setTodos(json);
        })
    }, todos);

    const writeTodo = (todoInput: string) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todos`, {
            method: "POST",
            headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            },
            body: JSON.stringify({
                todo: todoInput,
            }),
        })
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        writeTodo(todo);
        setTodo(""); 
    }

    return(
        <Container>
            <TodoForm onSubmit={handleSubmit}>
                <TodoInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)} value={todo} placeholder="TODO"/>
            </TodoForm>
            <Todos>
                {todos?.map( todo => <Todo key={todo.id} jwt={jwt} id={todo.id} todo={todo.todo} isCompleted={todo.isCompleted}></Todo> )}
            </Todos>
        </Container>
    )
}