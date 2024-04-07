import { NextResponse } from "next/server";
import DeviceRepository from "../../service/DeviceService"
import { isBefore, isValid, isAfter, startOfDay } from 'date-fns';


export async function GET(request: Request){
    const service = new DeviceRepository();
    const result = service.GetDevices(request);
    return (result);
}
export async function POST(req: Request, res: Response){
    try{
        const service = new DeviceRepository();
        const data  =await req.json()
        console.log(data);
        if (!data.name || !data.price || !data.category_id) {
            return NextResponse.json({ error: "Invalid data" });
        }
        if(data.sale_start !== null && data.sale_end !== null ){
            if (!isValid(new Date(data.sale_start)) || !isValid(new Date(data.sale_end))) {
                return NextResponse.json({ error: "Invalid date format" });
            }
        
            if (!isBefore(new Date(data.sale_start), new Date(data.sale_end))) {
                return NextResponse.json({ error: "sale_start must be before sale_end" });
            }
            const today = startOfDay(new Date());
            if (!isAfter(new Date(data.sale_start), today) || !isAfter(new Date(data.sale_end), today)) {
                return NextResponse.json({ error: "Dates must be after today" });
            }
        }
       
        console.log(data);//logs data correctly
        const result = await service.CreateDevice(
            data.name,
            data.price,
            data.sale_deduct || null,
            data.sale_start || null,
            data.sale_end || null,
            data.category_id);
        console.log(result);
        return (result);
    }catch(error){
        console.log(error);
       return NextResponse.json({error: error});
    }

}