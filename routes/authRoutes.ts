import express from "express";
import {auth} from "../firebase"
import {Router} from "express"
import {admin, db} from "../firebase"

const router = express.Router();

router.post("/verify-token", async (req, res) => {
    const { idToken } = req.body

    try {

        if(!idToken) {
            throw new Error("Missing idToken in the request")
        }
        const decodedToken = await auth.verifyIdToken(idToken);

        console.log(decodedToken)
        res.status(200).json({userId: decodedToken.uid})
    } catch (erorr) {
        res.status(401).json({ error: "invalid token"})
    }
})

export default router