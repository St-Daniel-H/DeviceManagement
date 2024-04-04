import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
export default class CategoryReposiroty{
     supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    public async GetCategories(){
       
        let { data: Device, error } = await this.supabase
        .from('Device') 
         .select('*')
         if(error){
            console.log(error);
         }else{
            return Device;
         }
    }
}