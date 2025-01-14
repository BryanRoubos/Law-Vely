"use strict";
module.exports = {
    preset: "ts-jest", // Use ts-jest for TypeScript support
    testEnvironment: "node", // Set the test environment to Node.js
    transform: {
        "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
