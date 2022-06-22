import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Button, Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import { AddCircle } from '@mui/icons-material';

export default function AddMetaData({onAdd}) {
    
  const [input,setInput] = React.useState({key:'', value: ''});

  const add = ()=>{
        onAdd(input); 
        setInput({key:'', value:''})
  }

  return (
    <SubCard style={{margin:'5px'}}>
        <Grid container>
            <Grid xs={12}>
                <TextField
                    label= 'Meta key'
                    value={input.key}
                    InputProps={{
                        readOnly: false,
                    }}
                    size='small'
                    style={{margin:'5px'}}
                    onChange = {e=>setInput({key:e.target.value, 
                                                value: input.value})}
                />
                <TextField
                    label= 'Meta value'
                    value={input.value}
                    InputProps={{
                        readOnly: false,
                    }}
                    size='small'
                    style={{margin:'5px'}}
                    onChange = {e=>setInput({key:input.key, 
                                                    value: e.target.value})}
                />
                
                <AddCircle  onClick={add} style={{marginTop : '10px'}} ></AddCircle>
            </Grid>
        </Grid>
    </SubCard>
  );
}
