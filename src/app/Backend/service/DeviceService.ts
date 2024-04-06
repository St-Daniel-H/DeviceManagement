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
             const name = searchParams.get("name");
             console.log(priceeq);
            try{
                let query = this.supabase.from('Device').select('*');
                  if (priceeq) {
                    query = query.eq('price', priceeq);
                }
             if (pricegt) {
                 query = query.gt('price', pricegt);
             }
              if (pricelt) {
                   query = query.lt('price',pricelt);
              }
               if (name) {
                  query = query.ilike('name', name);
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
}