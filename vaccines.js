import {React, useEffect, useState} from 'react'
import {  Button,  TextField,Typography,Grid } from '@mui/material';
import supabase from '../../supabaseClient.js';



const ManageVaccine=()=>{
  const [fetchError,setFetchError]=useState(null);
  const [admins,setadmin] = useState(null);

  useEffect(()=>{
    const fetchAdmins=async()=>{
      const {data,error}=await supabase
      .from('admin')
      .select()
      if(error){
        setFetchError('could not fetch admins');
        setadmin(null)
        console.log(error)
      }
      if(data){
        setFetchError(null)
        setadmin(data)
      }
    }
    fetchAdmins()

  },[])
    return(
        <div>
         
        <Grid container>
        <Grid item xs='12' md='12' className='form-container'>
        <form  className="add mt-5 form-horizontal" >
              <Typography component='h3' variant='contained' className='mb-2' >Add Vaccine</Typography>
            <Typography className="form-text mb-2 ">Enter Vaccine id:</Typography>
            <TextField  label='Id' variant='outlined'  type='text' name='id'  required/>
            <Typography className="mt-3 form-text mb-2 " >Enter Vaccine  Name:</Typography>
            <TextField  label='Name' variant='outlined' type='text' name='name'  required/>
             <Typography className="mt-3 form-text mb-2 " >Enter Vaccine  Quantity:</Typography>
            <TextField  label='Quantity' variant='outlined' type='number' name='quant'  required/>
            <br></br>
            <Button type='submit'   className='mt-4' size='large' variant='outlined' label='Add'>Add</Button>
        </form>
        </Grid>
       
   
     
        <Grid item xs='12' md={12} className='mt-5 form-container'>
        
              <Typography component='h3' variant='contained' className='mb-2' >Display Vaccines</Typography>
         <Grid container>
            {fetchError && (<p>{fetchError}</p>)}
            {admins && (<div>{admins.map(admin=>(
              <p>{admin.name}</p>
            ))}
            </div>)}
          </Grid>
        </Grid>
        </Grid>
        </div>
    );
}





export default ManageVaccine;