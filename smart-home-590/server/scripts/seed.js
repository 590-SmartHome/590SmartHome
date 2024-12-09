import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { userData } from "../data/index.js";

console.log("initiate seeding database!");
const db = await dbConnection();
await db.dropDatabase();

for (let i = 1; i < 5; i++) {
    let testUser = {
        username: `testuser${i}`,
        email: `testuser${i}@gmail.com`,
        hashedPassword: `test${i*5}`,
        avatarUrl: `http://testuser${i}.com`,
        first_name: `User${i}`,
        last_name: `Test`
    }
    userData.createUser(testUser);
}

await closeConnection();
console.log("Done seeding database!");

