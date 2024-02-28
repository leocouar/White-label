import axios from 'axios';
export async function save(favorite) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/favorite`;
    try {
        let response = await axios.post(fetchUrl, favorite);
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error("Could not create favorite!");
    }
}
export async function get(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/favorite/${id}`;
    try {
        let response = await axios.get(fetchUrl);
        return response;
    } catch (error) {
        console.error(error)
        throw new Error("Could not obtain favorite!");
    }
}
export async function getStatus(prodId,username) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/favorite/user?prodId=${prodId}&username=${username}`;
    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error("Could not evaluate if the product is a favorite!");
    }
}
export async function deleteFav(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/favorite/${id}`;
    try {
        let response = await axios.delete(fetchUrl);
        return response;
    } catch (error) {
        console.error(error)
        throw new Error("Could not delete favorite!");
    }
}
export async function findByUser(page = 0, size = 10, asc=true, username){
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/favorite/user/${username}?asc=${asc}&page=${page}&size=${size}`;
    try {
        const response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        return []
    }
}

export async function findAllByUser(username){
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/favorite/user/all/${username}`;
    try {
        const response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        return []
    }
}