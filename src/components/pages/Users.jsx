import React, { useEffect, useState } from "react";
import { Text, Container, List } from "../atoms";
import { ListItem } from "../atoms/List";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/users", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Container.App className="Users">
            <Text.Title>Utilisateurs</Text.Title>
            <List.Base>
                {users.map((user) => (
                    <ListItem key={user.id}>{user.lastName} {user.firstName}</ListItem>
                ))}
            </List.Base>
        </Container.App>
    );

};

export default Users;