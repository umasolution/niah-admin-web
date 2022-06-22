import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function DeletableChips({dataprovider, handleDel}) {
    
  const handleDelete = (data) => {
    handleDel(data);
  };

  return (
    <Stack direction="row" spacing={1}>
        {
            dataprovider.map(data=>{
                return (
                    <Chip label={data} onDelete={()=>handleDelete(data)} />
                )
            })
        }
      
    </Stack>
  );
}
