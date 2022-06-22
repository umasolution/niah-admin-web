import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Button, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeletableTextField({dataprovider, handleDel, textKey}) {
    
  const handleDelete = (data) => {
    handleDel(data);
  };

  return (
    <Grid container >
        {
            dataprovider.map((data,index)=>{
                return (
                    <Grid xs = {12} style={{display:'flex'}}>
                        <TextField
                            id="outlined-read-only-input"
                            label=""

                            value={textKey ? data[textKey] : data}
                            InputProps={{
                                readOnly: false,
                            }}
                            style={{margin:'5px', width:'90%'}}
                            size= 'small'
                        />
                        
                        <DeleteIcon style={{marginTop : '10px'}} 
                                    onClick={()=>handleDel(index)}/>
                    </Grid>
                    
                )
            })
        }
      
    </Grid>
  );
}
