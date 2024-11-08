import { Request, Response } from 'express';
import { DoctorService } from '../services/doctor.service';


export default class DoctorController{
    constructor() {}

    
    public static async getAll(req: Request, res: Response) {
        try {
            const doctors = await DoctorService.GetAll();
            res.status(200).json(doctors);
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const doctor = await DoctorService.GetById(Number(id));
            res.status(200).json(doctor);
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }

    public static async createDoctor(req: Request, res: Response) {
        const { name, email, specialty, bio } = req.body
        try {
            const doctor = await DoctorService.createDoctor({name, email, specialty, bio})
            res.status(200).json(doctor);
            
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }


    public static async updateDoctor(req: Request, res: Response) {
        try {
            const { id } = req.params
            const  doctorData = req.body
            const doctor = await DoctorService.updateDoctor(Number(id), doctorData)
            res.status(200).json(doctor);
            
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }

}