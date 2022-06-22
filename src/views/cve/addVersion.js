import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Button, Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

export default function AddVersion({onAdd, index}) {
    
  const [versionInput,setVersionInput] = React.useState({patch:'', version: ''});

  const add = ()=>{
        onAdd(versionInput, index); 
        setVersionInput({patch:'', version:''})
  }

  return (
    <SubCard style={{margin:'5px'}}>
        <Grid container>
            <Grid xs={12}>
                <TextField
                    label= 'Patch'
                    value={versionInput.patch}
                    InputProps={{
                        readOnly: false,
                    }}
                    size='small'
                    style={{margin:'5px'}}
                    onChange = {e=>setVersionInput({patch:e.target.value, 
                                    version: versionInput.version})}
                />
                <TextField
                    label= 'Version'
                    value={versionInput.version}
                    InputProps={{
                        readOnly: false,
                    }}
                    size='small'
                    style={{margin:'5px'}}
                    onChange = {e=>setVersionInput({patch:versionInput.patch, 
                        version: e.target.value})}
                />
                <Button onClick={add}>Add</Button>   
            </Grid>
        </Grid>
    </SubCard>
  );
}
