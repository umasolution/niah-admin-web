import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function CustomizedInputBase({searchTxt, onSearch}) {

 
  const [search, setSearch] = React.useState(searchTxt);

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            width: 250, 
            height:40,  
            borderStyle: 'solid', 
            borderColor: 'rgb(97, 97, 97)', 
            borderWidth:'thin',
            margin: '5px'}}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1, }}
        placeholder="Search a product using Id"
        value = {search}
        onChange = {e=>setSearch(e.target.value)}
       
      />
      <IconButton  sx={{ p: '10px' }} onClick={()=>{onSearch(search)}}>
        <SearchIcon />
      </IconButton>
     
    </Paper>
  );
}
