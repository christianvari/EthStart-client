import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

export function getIPFSURL(id) {
    return `https://ipfs.infura.io/ipfs/${id}`;
}

export function save(data) {
    return client.add(data);
}

export async function retrive(path) {
    const req = await fetch(getIPFSURL(path));
    return await req.text();
}
