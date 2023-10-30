import axios from "axios";

export async function findAllStores() {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get all stores !");
    }
}

export async function findByID(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store/${id}`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error("Could not get the store!");
    }
}

export async function saveStore(store) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store`;
    try {
        let response = await axios.post(fetchUrl, store);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Could not create store!");
    }
}

export async function updateStore(store) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store`;

    try {
        let response = await axios.put(fetchUrl, store);
        return response;
    } catch (error) {
        throw new Error("Could not update store !");
    }
}

export async function deleteStore(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store/${id}`;
    try {
        let response = await axios.delete(fetchUrl);
        return response;
    } catch (error) {
        throw new Error("Could not delete store!");
    }
}

export async function getAllProducts(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store/${id}/products`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get all products from that store !");
    }
}

export async function getOwner(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store/${id}/owner`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get the owner of that store !");
    }
}