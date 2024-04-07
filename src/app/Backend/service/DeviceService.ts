import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export default class DeviceCategory{
     supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,)
        public async GetDevices(request: Request){
             const { searchParams } = new URL(request.url);
             const priceeq = (searchParams.get("priceeq"));
             const pricegt = searchParams.get("pricegt");
             const pricelt = searchParams.get("pricelt");
             const ctname = searchParams.get("ctname");
             const onsale = searchParams.get("onsale");
             const name = searchParams.get("name");
             console.log(priceeq);
             try {
               let query: any;
                if (ctname) {
                   query = this.supabase
                  .from('Device')
                  .select('*, Category!inner(name)')
                  .eq('Category.name', ctname)
              }else{
                query = this.supabase
               .from('Device')
               .select('*, Category(name)')
              }
              

               if (priceeq) {
                   query = query.eq('price', parseInt(priceeq));
               }
   
               if (pricegt) {
                   query = query.gt('price', parseInt(pricegt));
               }
   
               if (pricelt) {
                   query = query.lt('price', parseInt(pricelt));
               }
   
               if (name) {
                   query = query.ilike('name', `%${name}%`);
               }
   
              
          
   
               if (onsale === "true") {
                   query = query.not('sale_deduct', 'is', null);
               }


                let { data: Device, error } = await query;
                 if(error){
                    return NextResponse.json(error);
                 }else{
                    return NextResponse.json({Devices: Device})
                 }
              }catch(error){
                console.log(error);
              }
        }
        public async CreateDevice(name:string,price:number,sale_deduct:number|null,sale_start:Date|null,sale_end:Date|null,category_id:number){
            let { data: Device, error } = await this.supabase
            .from('Device') 
             .insert({name: name,price:price,sale_deduct:sale_deduct,sale_start:sale_start,sale_end:sale_end,category_id:category_id})
             if(error){
                console.log(error);
                return NextResponse.json({error: "Error occured"});
             }
           return NextResponse.json(Device);
        }
        public async GetDeviceDetails(req: Request){
            
           try{
            const { searchParams } = new URL(req.url);
            const id = (searchParams.get("id"));
            if(!id) return NextResponse.json("invalid input")
                let { data: Device, error } = await this.supabase
            .from('Device')
            .select('*, Category(name)')
            .eq('id', id)
            if(error){
                return NextResponse.json(error);
            }   
            if(!Device) return NextResponse.json("Invalid Id")
            return NextResponse.json(Device);
           }catch(error){
            return NextResponse.json({error:error})
           }
        }

        public async UpdateDevice(id:number,name:string,price:number,sale_deduct:number|null,sale_start:Date|null,sale_end:Date|null,category_id:number){
            try{
                const { data, error } = await this.supabase
                 .from('Device')
                 .update({ name: name,price:price,sale_deduct:sale_deduct,sale_start:sale_start,sale_end:sale_end,category_id:category_id })
                 .eq('id',id)
                 .select();
                 if(error){
                    return NextResponse.json(error);
                }
                if(data) return NextResponse.json(data)
            }catch(error){
                return NextResponse.json({error:error})
            }
        }
        public async DeleteDevice(req: Request){
            try{
                const { searchParams } = new URL(req.url);
                const id = (searchParams.get("id"));
                if(!id) return NextResponse.json({error:"Invalid Id"});
                const { error } = await this.supabase
                .from('Device')
                .delete()
                .eq('id',id)
                if(error){
                    throw new Error(error.message);
                }
                return NextResponse.json("Device Deleted")
            }catch(error){
               return NextResponse.json({error:error});
            }
        }
}