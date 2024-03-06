import axios from "axios";

export async function save(user) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/user`;

    try {
        let response = await axios.post(fetchUrl, user);
        return response.data;
    } catch (error) {
        throw new Error("Could not create user !");
    }
}


export async function update(user) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/user`;

    try {
        let response = await axios.put(fetchUrl, user);
        return response;
    } catch (error) {
        throw new Error("Could not create user !");
    }
}


export async function login(credentials) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/user/login`;

    try {
        let response = await axios.post(fetchUrl, credentials);
        return response;
    } catch (error) {
        throw new Error("Could not login !");
    }
}

export async function findAll() {
    const fetchUrl = `${process.env.BACKEND_SERVICE}/user`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get all users !");
    }
}

export async function getByUsername(username) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/user/${username}`;
    try {
        let response = await axios.get(fetchUrl);

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.error("User not found");
            return false;
        } else {
            console.error("Error fetching user:", error.message);
            throw error;
        }
    }
}
