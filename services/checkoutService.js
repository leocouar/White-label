import axios from "axios";

export function findAll(page) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/checkout/search?page=${page}&size=10`;
    const fetchOptions = {
        endpoint: fetchUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try {
        const data = fetch(fetchUrl, fetchOptions)
            .then((response) => response.json())
            .catch(error => console.log(error));
        return data;
    } catch (error) {
        throw new Error("Could not fetch checkout!");
    }
}

export async function getById(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/checkout/${id}`;
    const fetchOptions = {
        endpoint: fetchUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const data = await fetch(fetchUrl, fetchOptions)
            .then((response) => response.json())
            .catch(error => console.log(error));
        return data;
    } catch (error) {
        throw new Error("Could not fetch checkout by id!");
    }
}

export async function search(value) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/checkout/search/${value}`;
    const fetchOptions = {
        endpoint: fetchUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const data = await fetch(fetchUrl, fetchOptions)
            .then((response) => response.json())
            .catch(error => console.log(error));
        return data;
    } catch (error) {
        throw new Error("Could not fetch checkout by id!");
    }
}


export async function getByUser(username, page = 0, asc = true, ) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/checkout/user/${username}?asc=${asc}&page=${page}`;
    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get the checkouts from the user!");
    }
}