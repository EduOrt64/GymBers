import { createClient } from "../server"



export default async function getUsers(){
    const supabase = await createClient()
    
    const { data, error } = await supabase

  .from('User')
  .select()

  if(error){
    console.log(error)
  }
  console.log(data)
}
