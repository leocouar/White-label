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

export async function saveStore(store, ownerIds) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store`;
    try {
        let response = await axios.post(fetchUrl, store, ownerIds);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Could not create store!");
    }
}

export async function updateStore(store) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store`;

    try {
        let response = await axios.put(fetchUrl, store);
        return response.data;
    } catch (error) {
        throw new Error("Could not update store !");
    }
}

export async function updateStoreOwners(storeId, ownerIds) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store/owners?storeId=${storeId}&ownerIds=${ownerIds.join(',')}`;
    
    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Could not update the owners of the store!");
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
export async function getStoresByUser(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/user/${id}/stores`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error("Could not get the store!");
    }
}

export async function getOwnerIds(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store/${id}/owners`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get the owners of that store !");
    }
}

export async function deleteStoreLogo(storeId, image) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/store/delete/${storeId}/${image}`;
    try {
        let response = await axios.delete(fetchUrl);
        return response;
    } catch (error) {
        throw new Error("Could not delete the logo of the store!");
    }
}