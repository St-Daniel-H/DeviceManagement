import { NextResponse } from "next/server";
import DeviceRepository from "../../../service/DeviceService"
import { isBefore, isValid, isAfter, startOfDay } from 'date-fns';


export async function GET(req: Request){
    try{
        const service = new DeviceRepository();
        const data  =await req.json()
        if(data.id){
            const result = service.GetDeviceDetails(data.id);
            return (result);
        }else{
            return NextResponse.json({error: "Invalid id"})
        }

    }catch(error){
        return NextResponse.json({error: error})
    }

}