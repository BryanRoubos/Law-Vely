import express from "express";
import {auth} from "../firebase"

const router = express.Router();

router.post("verify-token", async (req, res) => {
    const { idToken } = req.body

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        res.status(200).json({userId: decodedToken.uid})
    } catch (erorr) {
        res.status(401).json({ error: "invalid token"})
    }
})

export default router