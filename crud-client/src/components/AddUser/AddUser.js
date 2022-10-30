import React from 'react';

const AddUser = () => {
    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email };
        console.log(user);
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
        .then(res => res.json())
        .then(data => {
            alert('User added successfully');
            event.target.reset();
        })
    }
    return (
        <div>
            <h1>Add some users here:</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" placeholder='Name' />
                <br />
                <input type="email" name="email" id="email" placeholder='Email' />
                <br />
                <input type="submit" value="Add user" />
            </form>
        </div>
    );
};

export default AddUser;