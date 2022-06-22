
import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { SET_CVE_DATA, SET_PRODUCT_DATA, SET_SEARCH_CRITERIA } from "store/actions";
import { searchCVE } from "api/cveApi";
import { searchProduct } from "api/productApi";

const SearchBar = ({data, type, setLoading}) => {

    const dispatch = useDispatch();

    const [clonedSearchCriteria, setClonedSearchCriteria] = useState([...data]);

    let queryParam = ''

    const onChangeTxt = (event,index) => {
        
            let temp = [...clonedSearchCriteria];

            temp[index].userValue = event.target.value;

            setClonedSearchCriteria(temp);
        
    }

    const onSearch = async () => {
        
        setLoading(true);

        clonedSearchCriteria.map(criteria => {
            if(criteria.userValue != ''){
                queryParam = queryParam + criteria.value + '=' + criteria.userValue + '&'
            }
        })

        let response = null;

        if(type == 'cve'){
            response = await searchCVE({queryParam});
            dispatch({type: SET_CVE_DATA, data : response.data});
        }else if(type == 'product'){
            response = await searchProduct({queryParam});
            dispatch({type: SET_PRODUCT_DATA, data : response.data});
        }

        setLoading(false);

        
    }



    return (
        <Grid container>
            <Grid item xs={12}>
                {
                     clonedSearchCriteria.map((criteria, index) =>{
                        return (
                            <TextField
                                label= {criteria.label}
                                value = {criteria.userValue}
                                InputProps={{
                                    readOnly: false,
                                }}
                                size='small'
                                onChange = {event=>onChangeTxt(event, index)}
                                style={{margin:'5px', color:'rgb(97, 97, 97)'}}
                        />
                        )
                    })
                }
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" style={{margin:'5px'}} onClick = {onSearch} >Search</Button>
            </Grid>
        </Grid>
    )
}

export default SearchBar;