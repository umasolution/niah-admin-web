import { Button, Grid, TextField } from '@mui/material';
import react, { useState } from 'react';
import CustomizedInputBase from 'ui-component/textfields/CustomizedInputBase';
import {fetchProductApi} from '../../api/productApi';




const AddDetection = ({dataId, onActualAddDetection, onCancel}) => {

    const [detection, setDetection ] = useState({
                                                    advisory: "",
                                                    meta_info: {os:'', platform: ''},
                                                    niah_product_id: "",
                                                    niah_version_id: "NIAH-VERSION-XXX-YYYY-" + dataId,
                                                    product: "",
                                                    type: "",
                                                    vendor: "",
                                                    versions: []
                                                });

    const [product, setProduct] =  useState('');

    console.log(detection);

    const onSearch = async (searchTxt) => {
        const productResponse = await fetchProductApi({product_id:searchTxt});

        setDetection({...detection, product : productResponse.data[0].product,
                                    vendor :  productResponse.data[0].vendor,
                                    advisory :  productResponse.data[0].advisory,
                                    niah_product_id : searchTxt,
                                    type :  productResponse.data[0].type});
                                    
                                    console.log(detection);

        
    }

    const onVersionIdChange = (e,index) =>{
        setDetection({...detection, niah_version_id : replaceTxt(e.target.value,
                                                                    detection.niah_version_id, 
                                                                        index)})
    }

    const replaceTxt = (inp, txt, index) => {
        let splits =  txt.split('-');

        splits[index] = inp;

        console.log(splits.join('-'))

        return splits.join('-');
    }

    const onAdd = () => {
        onActualAddDetection(detection);
    }

    const onChangeMeta = (e, key)=> {
        setDetection({...detection, meta_info:{...detection.meta_info, [key]: e.target.value } })
    }
    return (
        <Grid container>
            <Grid xs={12} style={{display : 'flex'}}>
                <TextField
                    label= 'Advisory'
                    value={detection.advisory}
                    InputProps={{
                        readOnly: false,
                    }}
                    onChange = {(e)=> setDetection({...detection, advisory: e.target.value }) }
                    size='small'
                    style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                />
                 <CustomizedInputBase searchTxt='' onSearch={onSearch}/>
                <div style={{ margin: '12px', color: 'rgba(97, 97, 97)'}}>
                    <span>
                        <span >NIAH-VERSION-</span>
                        <span>{detection.type.toUpperCase()}</span>
                        <span>-</span>
                        <span>{detection.advisory.toUpperCase()}</span>
                        <span>-</span>
                        <span>{dataId}</span>
                    </span>
                </div>
                 
            </Grid>
            <Grid xs={12} style={{display : 'flex'}}>
                <TextField
                        label= 'Type'
                        value={detection.type}
                        InputProps={{
                            readOnly: false,
                        }}
                        size='small'
                        onChange = {(e)=> setDetection({...detection, type: e.target.value }) }
                        style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                    />
                 <TextField
                        label= 'Product'
                        value={detection.product}
                        InputProps={{
                            readOnly: false,
                        }}
                        size='small'
                        onChange = {(e)=> setDetection({...detection, product: e.target.value }) }
                        style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                    />
                <TextField
                    label= 'Vendor'
                    value={detection.vendor}
                    InputProps={{
                        readOnly: false,
                    }}
                    size='small'
                    onChange = {(e)=> setDetection({...detection, vendor: e.target.value }) }
                    style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                />
                  

            </Grid>
            
            <Grid xs={12} style={{display : 'flex'}}>
                    <TextField
                            label= 'OS'
                            value={detection.meta_info.os}
                            InputProps={{
                                readOnly: false,
                            }}
                            size='small'
                            onChange = {(e)=> onChangeMeta(e, 'os') }
                            style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                        />
                        <TextField
                            label= 'Platform'
                            value={detection.meta_info.platform}
                            InputProps={{
                                readOnly: false,
                            }}
                            size='small'
                            onChange = {(e)=> onChangeMeta(e, 'platform') }
                            style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                        />
            </Grid>
            
            <Button variant = 'contained' onClick={onAdd}>Add</Button>
            <Button variant = 'contained' onClick={onCancel}>Cancel</Button>
        </Grid>
    )
}

export default AddDetection