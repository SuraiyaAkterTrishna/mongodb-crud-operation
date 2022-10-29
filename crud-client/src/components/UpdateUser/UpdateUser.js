import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    useEffect( () => {
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    }, []);
    const handleUpdate = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const updatedUser = { name, email };
        fetch(`http://localhost:5000/user/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
          })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            alert('User Update successfully');
            event.target.reset();
        })
    }
    return (
        <div>
            <h1>Update User: {id}</h1>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" id="name" placeholder='Name' />
                <br />
                <input type="email" name="email" id="email" placeholder='Email' />
                <br />
                <input type="submit" value="Update user" />
            </form>
        </div>
    );
};

export default UpdateUser;