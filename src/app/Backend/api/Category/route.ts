import { NextResponse } from "next/server";
import CategoryReposiroty from "../../service/CategoryService"

export async function GET(){
    const service = new CategoryReposiroty();
    const result = service.GetCategories();
    return (result);
}
export async function POST(req: Request, res: Response){
    const service = new CategoryReposiroty();
    const data  =await req.json()
    if(!data.name) return NextResponse.json("invalid data");
    const result = await service.CreateCategory(data.name);
    return NextResponse.json(data);
}