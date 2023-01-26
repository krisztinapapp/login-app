//const path = `${process.env.PORT}`;
const path = 'http://localhost:3000';

const login = async (credentials) => {
    // credentials: contains the login information we want to log in with. If it checks out, the server returns a token.

    const response = await fetch(`${path}/api/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    })
        .then((res) => res.json())
        .then((data) => {
            if(data.ok) {
                return data;
            } else {
                throw new Error('Login error');
            }            
        })
        .catch(err => console.log(err));

    return response;
}

const signup = async (credentials) => {
    // credentials: contains the sign up information we want to sign up with.

    const response = await fetch(`${path}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.ok) {
                return data;
            } else {
                throw new Error('Duplicate username');
            }
        })
        .catch(err => {
            throw new Error('Duplicate username');
        });
    return response;
}

const getUserInfo = async () => {

    const response = await fetch(`${path}/api/getUserInfo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await response.json();
}

export { login, signup, getUserInfo };