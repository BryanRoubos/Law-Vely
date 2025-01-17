import SavedLegislations from "./SavedLegislations";

interface User {
    name: string;
    title: string;
}

const user: User = {
    name: "Jane Doe",
    title: "Legislation Enthusiast",
};

function ProfilePage() {
    return (
        <div id="PP-1" className="max-w-4xl m-5 w-full">
            <div id="PP-2" className="text-left my-3">
                <h1 id="PP-3" className="lg:text-2xl text-xl font-bold text-gray-800">Hello, {user.name}</h1>
                <p id="PP-4" className="text-gray-600">{user.title}</p>
            </div>

            <div id="PP-5" className="mb-1">
                <h2 id="PP-6" className="lg:text-2xl text-xl font-bold text-gray-800 mb-2">
                Your tracked legislations
                </h2>
                <SavedLegislations />
            </div>
        </div>
    )
};

export default ProfilePage;




// import {useEffect, useState} from "react";
// import {ref, get} from "firebase/database";
// import {db} from "../../firebaseConfig"

// interface Legislation {
//     id: string;
//     title: string;
//     summaryOfLegislation: string;
//     timestamp: number
// }
