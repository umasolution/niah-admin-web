import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Button, Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

export default function CVEVersion({version,index,versionIndex,onDelete}) {
    
  const handleDelete = (data) => {
    handleDel(data);
  };

  return (
    <SubCard style={{margin:'5px'}}>
        <Grid container>
            <Grid xs={12}>
                <TextField
                    label= 'Patch'
                    defaultValue={version.patch}
                    InputProps={{
                        readOnly: true,
                    }}
                    size='small'
                    style={{margin:'5px', color:'rgb(97, 97, 97)'}}
                />
                <TextField
                    label= 'Version'
                    defaultValue={version.version}
                    InputProps={{
                        readOnly: true,
                    }}
                    size='small'
                    style={{margin:'5px', color:'rgb(97, 97, 97)'}}
                />
               <Button onClick={()=>onDelete(index,versionIndex)}>Delete</Button>
            </Grid>
        </Grid>
    </SubCard>
  );
}
