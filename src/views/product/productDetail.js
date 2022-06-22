// material-ui
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Grid, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
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
        UPDATE_NON_DATA,
        ADD_UPDATED_PRODUCT_DETAIL_VERSION} from 'store/actions';
import DeletableChips from 'ui-component/Chips/deletableChips';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DeletableTextField from 'ui-component/textfields/deletableTextField';
import SubCard from 'ui-component/cards/SubCard';
import { width } from '@mui/system';
import { saveUpdateProduct } from 'api/productApi';
import AddMetaData from './addMetaData';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalUnstyledDemo from 'views/cve/revisionModal';
import ProductRevisionModalContent from './productRevisioContent';
import { updateHistory } from 'api/adminApi';
import CustomizedDialogs from 'ui-component/Dialog/CustomizedDialogs';


// ==============================|| SAMPLE PAGE ||============================== //

const styless = makeStyles({
    txtField: {
      
        color:'rgb(97, 97, 97)'
    },
    cweText: {
        height: '25px'
    }
});

const ProductDetails = () => {

    useEffect(()=>{
     //   dispatch({type:SET_SELECTED_CVE, data:cvedetail});
    }, [])

    const productDetails = useSelector(state => state.product.productDetails);
    const username = useSelector(state => state.authentication.username);
    const productdetailsArray = useSelector(state => state.product.productdetailsArray);

    const stylz = styless();
    const dispatch = useDispatch();

    
    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    const [updateStatus,setUpdateStatus] = useState(false);

    const [productStatus, setProdudctStatus] = useState(!productDetails.vuln_status ?  'assign' : productDetails.vuln_status);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleModal = ()=> {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false)
    }

    const handleCWEDelete = (cwe) => {
        console.log(cwe);
        dispatch({ type: DEL_CVE, data: cwe });
    }

    if(!productDetails.niah_product_id){
        return <LinearProgress style={{width:'100%'}} />
    }

  

    const onSave = async () => {
        let historyRes = null;

        try{

            let productDetailsClone = JSON.parse(JSON.stringify(productDetails));

            productDetailsClone.revision = productdetailsArray.length

            productDetailsClone.vuln_status = productStatus;

            
            if(!username || !productDetails.niah_product_id || !productDetails.niah_product_id || !productStatus || !productdetailsArray.length || !productDetailsClone){

                if(!username ){
                    consoel.log("********************User Name is undefined********************");
                }else if (!productDetails.niah_product_id){
                    consoel.log("********************productDetails.niah_product_id is undefined********************");
                }else if (!productStatus){
                    consoel.log("********************productStatus is undefined********************");
                }
                else if (!productdetailsArray.length){
                    consoel.log("********************productdetailsArray.length is undefined********************");
                }
                else if (!productDetailsClone){
                    consoel.log("********************productDetailsClone is undefined********************");
                }
              
                setShowUpdateStatus(true);
                setUpdateStatus(false);

                return;
            }

            const response  = await saveUpdateProduct(productDetailsClone);

           

            historyRes = await updateActionHistory();
            dispatch({type:UPDATE_NON_DATA, 
                data:{txt:productDetailsClone.revision,key:'revision'}})

            dispatch({type:ADD_UPDATED_PRODUCT_DETAIL_VERSION, 
                    data:productDetailsClone});
    

                

            setShowUpdateStatus(true);
            setUpdateStatus(true);
        }catch(e){
            setShowUpdateStatus(true);
            setUpdateStatus(false);
            consoel.log("********************API Failed********************",e);
        }
       
    }

    const updateActionHistory = async () => {
      
        const res = await updateHistory({
                                                  
                                                    type : 'Product', 
                                                    id : productDetails.niah_product_id, 
                                                    status : productStatus, 
                                                    lastupdated : new Date(), 
                                                    revision : productdetailsArray.length
                                            });

        return res;
    }

    const showStatus = () => {
        if(showUpdateStatus){
            return updateStatus ? <Alert severity="success">Product updated successfully !</Alert> :
                                     <Alert severity="error">Product update failed !</Alert>
        }else{
            return ''
        }
       
    }


    const onChangeTxt = (event, key) => {
        dispatch({type:UPDATE_META_DATA, data:{txt:event.target.value,key}})
    }

    const handleStatusChange = (event) => {
        if(event.target.value != 'assign'){
            dispatch({type:UPDATE_PRODUCT_STATUS, data:event.target.value})
        }
        setProdudctStatus(event.target.value)
    }

    const onAdd = (keyvalue) => {
        dispatch({type:ADD_META_DATA,data:keyvalue});
    }


    return (
        <>
            <CustomizedDialogs setOpen = {setOpen} open = {open}><ProductRevisionModalContent setOpen={setOpen}/></CustomizedDialogs>
            <MainCard title="Product Details">
                <Grid container spacing={2} >
            
                    <Grid xs={12}>
                            {
                                Object.entries(productDetails)
                                            .map(([key, value]) => {
                                            if(typeof productDetails[key] == 'string'){
                                                    return (<TextField
                                                        label= {key}
                                                        value={productDetails[key]}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        size='small'
                                                        style={{margin:'5px', width:'25%', color:'rgb(97, 97, 97)'}}
                                                    />)
                                            }
                                            })
                            }
                            <Button variant='contained' style={{marginRight:'10px', marginTop:'12px'}} onClick = {handleModal}>Revision {productDetails.revision}</Button>
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
                    <Grid xs={2}>
                        <Select
                            labelId="demo-simple-select-label"

                            value={productStatus}
                            label="Status"
                            style = {{height: '36.5px', margin : '5px'}}
                            onChange = {handleStatusChange}

                        >
                            <MenuItem value='assign'>Assign a Status</MenuItem>
                            <MenuItem value='indev'>In Development</MenuItem>
                            <MenuItem value='rfq'>Ready for QA</MenuItem>
                            <MenuItem value='qapass'>QA Passed</MenuItem>
                            <MenuItem value='release'>Release</MenuItem>
                        </Select>
                    </Grid>
                    <Grid xs={2}>
                        <Button variant="contained"
                            style={{ witdh: '100%', display: 'flex', justifyItems: 'flex-end', margin : '5px' }}
                            onClick={onSave}
                            disabled = {productStatus == 'assign'}
                        >Save</Button>
                    </Grid>
                    <Grid xs={8}>
                        {
                            showStatus()
                        }
                    </Grid>
                </Grid>
               
                   

          

            </MainCard>
        
        </>
    )
};

export default ProductDetails;
