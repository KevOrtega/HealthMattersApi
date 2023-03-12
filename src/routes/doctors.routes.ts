import { Router } from "express";
const  DoctorSchema = require('../models/Doctor')
const router = Router();

router.get('/doctors', (req, res) => {
    res.send('Doctors')
})

router.post('/doctors', (req, res) => {
    const user =  DoctorSchema(req.body)
    user.save()
    .then((data: any) => res.json(data))
    .catch((error:Error) => res.json({
        message: error
    }))
})

export default router