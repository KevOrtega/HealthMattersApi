import { Router } from "express";

const router = Router();

router.get('/doctors', (req, res) => {
    res.send('Doctors')
})

export default router