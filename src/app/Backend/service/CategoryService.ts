import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
export default class CategoryReposiroty{
     supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,)
    public async GetCategories(){
       try{
         let { data: Category, error } = await this.supabase
         .from('Category') 
          .select('*')
          if(error){
             console.log(error);
          }else{
            console.log(Category)
             return NextResponse.json({categories: Category})
          }
       }catch(error){
         console.log(error);
       }
       
    }
    public async CreateCategory(name: string){
       console.log(name);
      let { data: Category, error } = await this.supabase
      .from('Category') 
       .insert({name: name})
       if(error){
          console.log(error);
          return NextResponse.json({error: "Error occured"});
       }
     return NextResponse.json(Category);   
  }
}