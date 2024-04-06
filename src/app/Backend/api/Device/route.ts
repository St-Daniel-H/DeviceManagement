import { NextResponse } from "next/server";
import DeviceRepository from "../../service/DeviceService"

export async function GET(request: Request){
    const service = new DeviceRepository();
    const result = service.GetDevices(request);
    return (result);
}
// export async function POST(req: Request, res: Response){
//     const service = new CategoryReposiroty();
//     const data  =await req.json()
//     if(!data.name) return NextResponse.json("invalid data");
//     const result = await service.CreateCategory(data.name);
//     return NextResponse.json(data);
// }