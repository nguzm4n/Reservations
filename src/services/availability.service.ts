import { Availability } from "../models/availability";
import { AppDataSource } from "../config/data-source";

export class AvailabilityService {
    private static repo = AppDataSource.getRepository(Availability)


    
}