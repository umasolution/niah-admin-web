import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Button, Grid, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import SubCard from 'ui-component/cards/SubCard';

export default function AddKeyValue({onAdd, index}) {
    
  const [versionInput,setVersionInput] = React.useState({key:'', value: ''});

  const add = ()=>{
        onAdd(versionInput, index); 
        setVersionInput({key:'', value:''})
  }

 

  return (
    <SubCard style={{margin:'5px'}}>
        <Grid container>
            <Grid xs={12}>
                <TextField
                    label= 'Key'
                    value={versionInput.key}
                    InputProps={{
                        readOnly: false,
                    }}
                    size='small'
                    style={{margin:'5px'}}
                    onChange = {e=>setVersionInput({key:e.target.value, 
                                    value: versionInput.value})}
                />
                <TextField
                    label= 'Value'
                    value={versionInput.value}
                    InputProps={{
                        readOnly: false,
                    }}
                    size='small'
                    style={{margin:'5px'}}
                    onChange = {e=>setVersionInput({key:versionInput.key, 
                        value: e.target.value})}
                />
                  <AddCircle  onClick={add} style={{marginTop : '10px'}} ></AddCircle>
            </Grid>
        </Grid>
    </SubCard>
  );
}
