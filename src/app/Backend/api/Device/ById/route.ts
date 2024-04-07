import { NextResponse } from "next/server";
import DeviceRepository from "../../../service/DeviceService"


export async function GET(req: Request){
    try{
        const service = new DeviceRepository();
        const result = service.GetDeviceDetails(req);
        return (result);

    }catch(error){
       // console.log(error);
        return NextResponse.json({error:error})
    }

}
export async function DELETE(req: Request){
    try{
        const service = new DeviceRepository();
        const result = service.DeleteDevice(req);
        return (result);

    }catch(error){
       // console.log(error);
        return NextResponse.json({error:error})
    }

}