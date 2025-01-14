"use strict";
const { db } = require("./firebase");
const seed = (userData) => {
    const usersRef = db.ref('users');
    return usersRef
        .set(null)
        .then(() => {
        const userPromises = userData.map(({ username, name, avatar_url }) => {
            return usersRef.child(username).set({
                name,
                avatar_url: avatar_url || null,
            });
        });
        return Promise.all(userPromises);
    })
        .then(() => {
        console.log("Users seeded!");
    })
        .catch((err) => {
        console.error("error seeding users", err);
    });
};
module.exports = seed;
