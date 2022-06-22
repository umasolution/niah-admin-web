// material-ui
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Grid, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CVE, 
        ADD_META_DATA, 
        ADD_REF_DATA, 
        ADD_VERSION, 
        DEL_CVE, 
        DEL_REF_DATA, 
        DEL_VERSION, 
        SET_SELECTED_CVE, 
        UPDATE_META_DATA, 
        UPDATE_PRODUCT_STATUS,
        DEL_META_DATA, 
        UPDATE_NON_DATA} from 'store/actions';
import DeletableChips from 'ui-component/Chips/deletableChips';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DeletableTextField from 'ui-component/textfields/deletableTextField';
import SubCard from 'ui-component/cards/SubCard';
import { width } from '@mui/system';
import { addProduct, saveUpdateProduct } from 'api/productApi';
import AddMetaData from './addMetaData';
import DeleteIcon from '@mui/icons-material/Delete';


// ==============================|| SAMPLE PAGE ||============================== //

const styless = makeStyles({
    txtField: {
      
        color:'rgb(97, 97, 97)'
    },
    cweText: {
        height: '25px'
    }
});

const AddProduct = () => {

    useEffect(()=>{
     //   dispatch({type:SET_SELECTED_CVE, data:cvedetail});
    }, [])

    const productDetails = useSelector(state => state.product.productDetails);

    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    const [updateStatus,setUpdateStatus] = useState(false);

    const stylz = styless();
    const dispatch = useDispatch();


    const onChangeTxt = (event, key) => {
        dispatch({type:UPDATE_META_DATA, data:{txt:event.target.value,key}})
    }

   
    const onAdd = (keyvalue) => {
        dispatch({type:ADD_META_DATA,data:keyvalue});
    }

    const onAddProduct = async() => {
        try{
            const response = await addProduct(productDetails);
            setShowUpdateStatus(true);
            setUpdateStatus(true);
        }catch(e){
            setShowUpdateStatus(true);
            setUpdateStatus(false);
        }
     
    }

    const onChangeNonMeta = (event, key) => {
        dispatch({type:UPDATE_NON_DATA, 
            data:{txt:getNiahProductId(),key:'niah_product_id'}})
        dispatch({type:UPDATE_NON_DATA, data:{txt:event.target.value,key}})
    }

    const navigate = useNavigate();

    if (!productDetails.meta_data) {
        navigate('/niah/main/product');
        return <LinearProgress style={{ width: '100%' }} />
    }

    const getNiahProductId = () => {
        const productId =  "NIAH-"+productDetails.type.toUpperCase()+'-'
        +productDetails.advisory.toUpperCase()+'-'
            +productDetails.vendor.toUpperCase()+'-'
            +productDetails.product.toUpperCase();

      

        return productId;
    }

    const showStatus = () => {
        if(showUpdateStatus){
            return updateStatus ? <Alert severity="success">Product updated successfully !</Alert> :
                                     <Alert severity="error">Product update failed !</Alert>
        }else{
            return ''
        }
       
    }


    return (
        <>
            <MainCard title="Product Details">
                <Grid container spacing={2} >
            
                    <Grid xs={12}>
                            {
                                Object.entries(productDetails)
                                            .map(([key, value]) => {
                                            if(typeof productDetails[key] == 'string'){
                                                    return (<TextField
                                                        label= {key}
                                                        value={key == 'niah_product_id' ? getNiahProductId() : productDetails[key]}
                                                        InputProps={(key == 'revision' || key == 'niah_product_id') ? {
                                                            readOnly: true
                                                        } : {readOnly : false}}
                                                        size='small'
                                                        onChange = {e=>onChangeNonMeta(e,key)}
                                                        style={{margin:'5px', width:'25%', color:'rgb(97, 97, 97)'}}
                                                    />)
                                            }
                                            })
                            }
                    </Grid>
                    <Grid xs={12}>
                        {
                                Object.entries(productDetails.meta_data)
                                            .map(([key, value]) => {
                                       
                                                    return (<div style={{display: 'flex'}}>
                                                                <TextField
                                                                label= {key}
                                                                value={productDetails.meta_data[key]}
                                                                InputProps={{
                                                                    readOnly: false,
                                                                }}
                                                                onChange = {event=>onChangeTxt(event,key)}
                                                                size='small'
                                                                style={{margin:'5px', width:'25%', color:'rgb(97, 97, 97)'}}/>
                                                           
                                                                <DeleteIcon style={{marginTop : '10px'}} 
                                                                            onClick = {()=> {dispatch({type : DEL_META_DATA, data : {key : key}})}}/>
                                                             </div>)
                                            
                                            })
                            }
                            <AddMetaData onAdd = {onAdd} />
                    </Grid>
                    <Grid xs={12} style={{display:'flex', float:'right'}}>
                  
                        {
                            showStatus()
                        }
                       
                        <Button variant='contained' style={{margin:'2px',float:'right'}} onClick={onAddProduct} >Add Product</Button>    
                    </Grid>
                </Grid>
            </MainCard>
        
        </>
    )
};

export default AddProduct;
