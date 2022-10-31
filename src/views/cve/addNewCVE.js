// material-ui
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Button,
    Grid,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ADD_CVE,
    ADD_REF_DATA,
    ADD_VERSION,
    DEL_CVE,
    DEL_REF_DATA,
    DEL_VERSION,
    SET_SELECTED_CVE,
    UPDATE_CVE_STATUS,
    UPDATE_DESC,
    ADD_DESC,
    ADD_DETECTION,
    UPDATE_BASE_METRIC_V2,
    UPDATE_BASE_METRIC_V3,
    UPDATE_CVE_DETAILS,
    ADD_BASEMETRIC_V2,
    ADD_BASEMETRIC_V3,
    DEL_BASEMETRIC_V2,
    DEL_BASEMETRIC_V3,
    DEL_DESC
} from 'store/actions';
import DeletableChips from 'ui-component/Chips/deletableChips';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DeletableTextField from 'ui-component/textfields/deletableTextField';
import SubCard from 'ui-component/cards/SubCard';
import CVEVersion from './cveversion';
import AddVersion from './addVersion';
import { keys, margin, width } from '@mui/system';
import cvedetail from 'store/data/cvedetailsdata';
import { addCVE, saveUpdateCVE } from 'api/cveApi';
import RichEditor from 'ui-component/editors/RichEditor';
import AddDetection from './addDetection';
import AddKeyValue from './addKeyValue';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import { AddCircle } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

// ==============================|| SAMPLE PAGE ||============================== //

const styless = makeStyles({
    txtField: {
        color: 'rgb(97, 97, 97)'
    },
    cweText: {
        height: '25px'
    }
});

const AddNewCVE = () => {
    useEffect(() => {
        //dispatch({type:SET_SELECTED_CVE, data:cvedetail});
    }, []);

    const cvedetails = useSelector((state) => state.cve.cvedetails);
    const stylz = styless();
    const dispatch = useDispatch();

    const [cweInput, setCWEInput] = useState('');
    const [refDataInput, setRefDataInput] = useState('');
    const [descInput, setDescInput] = useState('');
    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [cvestatus, setcvestatus] = useState(!cvedetails.vuln_status ? 'assign' : cvedetails.vuln_status);

    const [addDetection, setAddDetection] = useState(false);

    const handleCWEDelete = (cwe) => {
        console.log(cwe);
        dispatch({ type: DEL_CVE, data: cwe });
    };

    const handleRefDataDelete = (refDataIndex) => {
        //console.log(cwe);
        dispatch({ type: DEL_REF_DATA, data: refDataIndex });
    };

    const onAddRefData = () => {
        dispatch({ type: ADD_REF_DATA, data: { url: refDataInput, type: '' } });
        setRefDataInput('');
    };

    const onAddDesc = () => {
        dispatch({ type: ADD_DESC, data: { key: descInput } });
        setDescInput('');
    };

    const onAddDetection = (data) => {
        dispatch({ type: ADD_DETECTION, data: data });
        setAddDetection(!addDetection);
    };

    const onCancel = () => {
        setAddDetection(false);
    };

    const onAddVersion = (versionInput, index) => {
        {
            /* Issue 2: 22-06-2022} */
        }
        let duplicate = false;
        cvedetails.detection.map((detect, detailsIndex) => {
            detect.versions.map((versionData, versionIndex) => {
                if (
                    (versionData.patch == versionInput.patch || versionData.version == versionInput.version) &&
                    (index == detailsIndex || index == versionIndex)
                ) {
                    duplicate = true;
                }
            });
        });
        if (duplicate == false) {
            dispatch({ type: ADD_VERSION, data: versionInput, index: index });
        }
    };

    const onDeleteVersion = (index, versionIndex) => {
        dispatch({ type: DEL_VERSION, data: { index, versionIndex } });
    };

    const navigate = useNavigate();

    if (!cvedetails.cwe_data) {
        navigate('/cve');
        return <LinearProgress style={{ width: '100%' }} />;
    }

    const updateDescChange = (txt, key) => {
        dispatch({ type: UPDATE_DESC, data: { txt: txt, key } });
    };

    const showStatus = () => {
        if (showUpdateStatus) {
            return updateStatus ? (
                <Alert severity="success">CVE created successfully !</Alert>
            ) : (
                <Alert severity="error">CVE Crate failed !</Alert>
            );
        } else {
            return '';
        }
    };

    const handleStatusChange = (event) => {
        if (event.target.value != 'assign') {
            dispatch({ type: UPDATE_CVE_STATUS, data: event.target.value });
        }
        setcvestatus(event.target.value);
    };

    const onAddNewCVE = async () => {
        try {
            const response = await addCVE({ data: cvedetails });
            setShowUpdateStatus(true);
            setUpdateStatus(true);
        } catch (e) {
            setShowUpdateStatus(true);
            setUpdateStatus(false);
        }
    };

    const onAddBaseMetricV2 = (keyvalue) => {
        dispatch({ type: ADD_BASEMETRIC_V2, data: keyvalue });
    };

    const onAddBaseMetricV3 = (keyvalue) => {
        dispatch({ type: ADD_BASEMETRIC_V3, data: keyvalue });
    };

    const onDelBaseMetricV2 = (keyvalue) => {
        dispatch({ type: DEL_BASEMETRIC_V2, data: keyvalue });
    };

    const onDelBaseMetricV3 = (keyvalue) => {
        dispatch({ type: DEL_BASEMETRIC_V3, data: keyvalue });
    };

    const getNiahId = () => {
        const niahId = 'NIAH-' + cvedetails.data_type.toUpperCase() + '-' + cvedetails.data_id.toUpperCase();

        return niahId;
    };

    const updateCVEDetails = (e, key) => {
        dispatch({ type: UPDATE_CVE_DETAILS, data: { key: key, value: e.target.value } });

        dispatch({ type: UPDATE_CVE_DETAILS, data: { key: 'niahid', value: getNiahIdNow(key == 'data_type' ? 1 : 2, e) } });
    };

    const getNiahIdNow = (index, e) => {
        let niahId = null;

        if (index == 1) {
            return 'NIAH-' + e.target.value.toUpperCase() + '-' + cvedetails.data_id.toUpperCase();
        } else {
            return 'NIAH-' + cvedetails.data_type.toUpperCase() + '-' + e.target.value.toUpperCase();
        }
    };

    const disableAddCVE = () => {
        {
            /* Issue 1,7: 24-6-2022*/
        }
        if (
            cvedetails.basemetricv3_data[''] == '' ||
            cvedetails.basemetricv2_data[''] == '' ||
            cvedetails.data_id == '' ||
            cvedetails.data_type == ''
        ) {
            return true;
        }
    };

    const onDeleteDesc = (txt, key, index) => {
        {
            /* Issue 8: 24-6-2022*/
        }
        dispatch({ type: DEL_DESC, data: { txt: txt, key, index } });
    };

    const onAddCWEId = () => {
        {
            /* Issue 5: 24-6-2022*/
        }
        dispatch({ type: ADD_CVE, data: cweInput });
        setCWEInput('');
    };

    return (
        <>
            <MainCard title="CVE Info">
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Niah Id"
                            value={getNiahId()}
                            InputProps={{
                                readOnly: true,
                                classes: stylz.txtField
                            }}
                            onChange={(e) => dispatch({ type: UPDATE_CVE_DETAILS, data: { key: 'niahid', value: e.target.value } })}
                            style={{ margin: '5px', width: '100%', color: 'rgb(97, 97, 97)' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Data Id"
                            value={cvedetails.data_id}
                            InputProps={{
                                readOnly: false
                            }}
                            onChange={(e) => updateCVEDetails(e, 'data_id')}
                            style={{ margin: '5px', color: 'rgb(97, 97, 97)' }}
                        />
                    </Grid>
                    <Grid item xs={8} className="react-date-wrap" style={{ display: 'flex', paddingTop: '0px' }}>
                        <div>
                            <span>Published Date</span>
                            <ReactDatePicker
                                selected={cvedetails.publisheddate != '' ? new Date(cvedetails.publisheddate) : ''}
                                onChange={(date) => dispatch({ type: UPDATE_CVE_DETAILS, data: { key: 'publisheddate', value: date } })}
                            />
                        </div>

                        <div>
                            <span>Last Modified Date</span>
                            <ReactDatePicker
                                selected={
                                    cvedetails.lastmodifieddate != '' ? new Date(cvedetails.lastmodifieddate) : cvedetails.lastmodifieddate
                                }
                                onChange={(date) => dispatch({ type: UPDATE_CVE_DETAILS, data: { key: 'lastmodifieddate', value: date } })}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex' }}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Data Type"
                            defaultValue={cvedetails.data_type}
                            InputProps={{
                                readOnly: false
                            }}
                            onChange={(e) => updateCVEDetails(e, 'data_type')}
                            style={{ margin: '5px', color: 'rgb(97, 97, 97)' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Revision"
                            value={cvedetails.revision}
                            InputProps={{
                                readOnly: true
                            }}
                            onChange={(e) => dispatch({ type: UPDATE_CVE_DETAILS, data: { key: 'revision', value: e.target.value } })}
                            style={{ margin: '5px', color: 'rgb(97, 97, 97)' }}
                        />
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard title="CWE Ranking Info">
                <Grid container>
                    <Grid xs={12}>
                        <div style={{ margin: '5px' }}>
                            <TextField size="small" value={cweInput} onChange={(e) => setCWEInput(e.target.value)} />
                            <AddCircle onClick={() => onAddCWEId()} style={{ marginTop: '10px' }}></AddCircle>
                        </div>
                    </Grid>
                    <Grid xs={12}>
                        <DeletableChips dataprovider={cvedetails.cwe_data.data} handleDel={handleCWEDelete} />
                    </Grid>
                    <Grid xs={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>Base Metric V2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    {Object.keys(cvedetails.basemetricv2_data).map((key) => {
                                        return (
                                            <Grid xs={6} style={{ display: 'flex' }}>
                                                <TextField
                                                    label={key}
                                                    value={cvedetails.basemetricv2_data[key]}
                                                    InputProps={{
                                                        readOnly: false
                                                    }}
                                                    size="small"
                                                    onChange={(e) =>
                                                        dispatch({ type: UPDATE_BASE_METRIC_V2, data: { key: key, value: e.target.value } })
                                                    }
                                                    style={{ margin: '5px', color: 'rgb(97, 97, 97)' }}
                                                />
                                                <DeleteIcon
                                                    style={{ marginTop: '10px' }}
                                                    onClick={() => {
                                                        onDelBaseMetricV2({ key });
                                                    }}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                <AddKeyValue onAdd={onAddBaseMetricV2} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid xs={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>Base Metric V3</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    {Object.keys(cvedetails.basemetricv3_data).map((key) => {
                                        return (
                                            <Grid xs={6} style={{ display: 'flex' }}>
                                                <TextField
                                                    label={key}
                                                    value={cvedetails.basemetricv3_data[key]}
                                                    InputProps={{
                                                        readOnly: false
                                                    }}
                                                    onChange={(e) =>
                                                        dispatch({ type: UPDATE_BASE_METRIC_V3, data: { key: key, value: e.target.value } })
                                                    }
                                                    size="small"
                                                    style={{ margin: '5px' }}
                                                />
                                                <DeleteIcon
                                                    style={{ marginTop: '10px' }}
                                                    onClick={() => {
                                                        onDelBaseMetricV3({ key });
                                                    }}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                <AddKeyValue onAdd={onAddBaseMetricV3} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard title="CVE Reference Data">
                <DeletableTextField dataprovider={cvedetails.reference_data.data} textKey="" handleDel={handleRefDataDelete} />
                <Grid container>
                    <Grid xs={12}>
                        <TextField
                            label=""
                            value={refDataInput}
                            InputProps={{
                                readOnly: false
                            }}
                            placeholder="Add a new Reference"
                            size="small"
                            style={{ margin: '5px', width: '90%', color: 'rgb(97, 97, 97)' }}
                            onChange={(e) => setRefDataInput(e.target.value)}
                        />

                        <AddCircle onClick={() => onAddRefData()} style={{ marginTop: '10px' }}></AddCircle>
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard title="Description">
                <Grid xs={12}>
                    {/* Issue 8: 24-6-2022*/}
                    {Object.entries(cvedetails.description).map(([key, value], index) => {
                        if (typeof cvedetails.description[key] == 'string') {
                            return (
                                <SubCard title={key}>
                                    <RichEditor
                                        data={cvedetails.description[key]}
                                        onSave={updateDescChange}
                                        keyy={key}
                                        descIndex={index}
                                        onDeleteDesc={onDeleteDesc}
                                    />
                                </SubCard>
                            );
                        }
                    })}
                    <Grid xs={12}>
                        <TextField
                            label=""
                            value={descInput}
                            InputProps={{
                                readOnly: false
                            }}
                            placeholder="Add a new Description"
                            size="small"
                            style={{ margin: '5px', width: '90%', color: 'rgb(97, 97, 97)' }}
                            onChange={(e) => setDescInput(e.target.value)}
                        />

                        <AddCircle onClick={() => onAddDesc()} style={{ marginTop: '10px' }}></AddCircle>
                    </Grid>
                </Grid>
            </MainCard>

            <MainCard title="Detection">
                {cvedetails.detection.map((detect, index) => {
                    return (
                        <SubCard>
                            <Grid container>
                                <Grid xs={12}>
                                    {Object.entries(detect).map(([key, value]) => {
                                        if (typeof detect[key] == 'string') {
                                            return (
                                                <TextField
                                                    label={key}
                                                    defaultValue={detect[key]}
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                    size="small"
                                                    style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                                                />
                                            );
                                        }
                                    })}
                                </Grid>
                                <Grid xs={12}>
                                    {Object.entries(detect).map(([key, value]) => {
                                        if (key == 'meta_info') {
                                            return Object.entries(detect[key]).map(([key, value]) => {
                                                return (
                                                    <TextField
                                                        label={key}
                                                        defaultValue={value}
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                        size="small"
                                                        style={{ margin: '5px', width: '25%', color: 'rgb(97, 97, 97)' }}
                                                    />
                                                );
                                            });
                                        }
                                    })}
                                </Grid>

                                {detect.versions.map((version, versionIndex) => {
                                    return (
                                        <CVEVersion
                                            version={version}
                                            versionIndex={versionIndex}
                                            index={index}
                                            onDelete={onDeleteVersion}
                                        />
                                    );
                                })}
                                <AddVersion onAdd={onAddVersion} index={index} />
                            </Grid>
                        </SubCard>
                    );
                })}
                {addDetection ? (
                    <AddDetection dataId={cvedetails.data_id} onActualAddDetection={onAddDetection} onCancel={onCancel} />
                ) : (
                    <Button variant="contained" onClick={() => setAddDetection(!addDetection)}>
                        Add New Detection
                    </Button>
                )}
                <Grid xs={12} style={{ float: 'right', display: 'flex' }}>
                    <Button variant="contained" style={{ margin: '2px' }} onClick={onAddNewCVE} disabled={disableAddCVE()}>
                        Add CVE
                    </Button>
                    {showStatus()}
                </Grid>
            </MainCard>
        </>
    );
};

export default AddNewCVE;
