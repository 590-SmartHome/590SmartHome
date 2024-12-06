import { ObjectId } from "mongodb";

export function validateString(stringInput, input = "input") {
    if (!stringInput) throw `must input ${input}`;
    if (typeof stringInput != "string") throw `${input} must be a string`;
    stringInput = stringInput.trim();
    if (stringInput == "") throw `${input} cannot be empty or only spaces`;
    return stringInput;
}

export function validateId(id, name = "id") {
    id = validateString(id, "id");
    if (!ObjectId.isValid(id)) throw `invalid ${name}`;
    return id;
}

export function validateObjectIDArray(arr, name = "ObjectId") {
    if (typeof arr == "undefined") throw "must input array";
    if (!Array.isArray(arr)) throw `must input an array of ${name}s`;
    arr.forEach(id => {
        id = validateId(id, name)
    });
    return arr;
}

export function validateUser(user) {
    user.username = validateString(user.username, "username");
    user.email = validateString(user.email, "email");
    user.hashedPassword = validateString(user.hashedPassword, "hashedPassword");
    user.avatarUrl = validateString(user.avatarUrl, "avatarUrl");
    user.first_name = validateString(user.first_name, "first_name");
    user.last_name = validateString(user.last_name, "last_name");
    //user.homes = validateObjectIDArray(user.homes, "homeId")
    //user.preferences = validateObjectIDArray(user.preferences, "preferenceId")
    return user;
}

export function validateUpdateUser(user) {
    if (user.username) {user.username = validateString(user.username, "username");}
    if (user.email) {user.email = validateString(user.email, "email");}
    if (user.hashedPassword) {user.hashedPassword = validateString(user.hashedPassword, "hashedPassword");}
    if (user.avatarUrl) {user.avatarUrl = validateString(user.avatarUrl, "avatarUrl");}
    if (user.first_name) {user.first_name = validateString(user.first_name, "first_name");}
    if (user.last_name) {user.last_name = validateString(user.last_name, "last_name");}
    if (user.homes) {user.homes = validateObjectIDArray(user.homes, "homeId")}
    if (user.preferences) {user.preferences = validateObjectIDArray(user.preferences, "preferenceId")}
    return user;
}
  