import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect( () => {
        fetch('http://localhost:5000/user')
        .then(res => res.json())
        .then(data => setUsers(data))
    } , []);
    // button for delete user handle 
    const handleUserDelete = id => {
        const proceed = window.confirm('Are you sure to delete user?');
        if(proceed){
            const url = `http://localhost:5000/user/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log("data deleted", data);
                if(data.deletedCount>0){
                    const remain = users.filter(user => user._id !== id);
                    setUsers(remain);
                    console.log(remain);
                    console.log(id);
                }
            })
        }
    }
    return (
        <div>
            <h1>This is home</h1>
            <h1>Available Users: {users.length}</h1>
            <ul>
                {
                    users.map(user => <li key={user._id}>{user.name}::{user.email} 
                    <Link to={`/user/update/${user._id}`} ><button>Update</button></Link>
                    <button onClick={() => handleUserDelete(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Home;