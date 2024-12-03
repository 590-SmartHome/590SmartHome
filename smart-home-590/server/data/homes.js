import { homes } from "../config/mongoCollections.js";

const getAllHomes = async () => {
    const homeCollection = await homes();
    const myHomes = await homeCollection.find({}).toArray();
    return myHomes;
}

export default {getAllHomes}