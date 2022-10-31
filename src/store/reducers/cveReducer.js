import * as actionTypes from '../actions';

const initalState = {
    columns: [],
    rows: [],
    rawData: {},
    cvedetails: {},
    cvedetailsArray: [],
    searchCriteria: [
        { value: 'severity', label: 'Severity', userValue: '' },
        { value: 'attackVector', label: 'Attach Vector', userValue: '' },
        { value: 'basescore', label: 'Base Score', userValue: '' },
        { value: 'niahid', label: 'Niah Id', userValue: '' },
        { value: 'data_type', label: 'Data Type', userValue: '' },
        { value: 'publisheddate', label: 'Published Date', userValue: '' },
        { value: 'status', label: 'Status', userValue: '' },
        { value: 'lastmodifieddate', label: 'Last Modified Date', userValue: '' },
        { value: 'vuln_status', label: 'Vul Status', userValue: '' },
        { value: 'data_id', label: 'Data Id', userValue: '' },
        { value: 'year', label: 'Year', userValue: '' }
    ]
};

const cveReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SET_CVE_DATA:
            return {
                ...state,
                rawData: action.data,
                columns: action?.data?.columns,
                rows: transformRows(action?.data?.results)
            };
        case actionTypes.SET_SELECTED_CVE:
            let sortedData = action.data.sort((a, b) => a.revision - b.revision);
            return {
                ...state,
                cvedetails: JSON.parse(JSON.stringify(action.data[action.data.length - 1])),
                cvedetailsArray: JSON.parse(JSON.stringify(action.data))
            };

        case actionTypes.ADD_CVE:
            return {
                ...state,
                cvedetails: {
                    ...state.cvedetails,
                    cwe_data: {
                        ...state.cvedetails.cwe_data,
                        data: [...state.cvedetails.cwe_data.data, action.data]
                    }
                }
            };

        case actionTypes.DEL_CVE:
            let ForDelCWE = JSON.parse(JSON.stringify(state));

            ForDelCWE.cvedetails.cwe_data.data.splice(ForDelCWE.cvedetails.cwe_data.data.indexOf(action.data), 1);

            return ForDelCWE;

        case actionTypes.ADD_REF_DATA:
            let clonedData = JSON.parse(JSON.stringify(state));

            clonedData.cvedetails.reference_data.data.push(action.data.url);

            return clonedData;
        /*  return {
              ...state,
              cvedetails : {
                  ...state.cvedetails,
                  cwe_data : {
                      ...state.cvedetails.reference_data,
                      data : [...state.cvedetails.reference_data.data, action.data]
                  }
 
              }
          }*/

        case actionTypes.ADD_DESC:
            let ForDescAdd = JSON.parse(JSON.stringify(state));

            ForDescAdd.cvedetails.description[action.data.key] = '';

            return ForDescAdd;

        case actionTypes.DEL_DESC:
            {
                /* CVE issue 8 : 24/06/2022 */
            }
            let delDescription = JSON.parse(JSON.stringify(state));

            delete delDescription.cvedetails.description[action.data.key];

            return delDescription;

        case actionTypes.DEL_REF_DATA:
            let ForDel = JSON.parse(JSON.stringify(state));

            ForDel.cvedetails.reference_data.data.splice(action.data, 1);

            return ForDel;

        case actionTypes.ADD_VERSION:
            let clonedDataForVersion = JSON.parse(JSON.stringify(state));

            clonedDataForVersion.cvedetails.detection[action.index].versions.push(action.data);

            return clonedDataForVersion;

        case actionTypes.DEL_VERSION:
            let ForDelVersion = JSON.parse(JSON.stringify(state));

            ForDelVersion.cvedetails.detection[action.data.index].versions.splice(action.data.versionIndex, 1);

            return ForDelVersion;
        case actionTypes.UPDATE_DESC:
            let ForDescUpdate = JSON.parse(JSON.stringify(state));

            ForDescUpdate.cvedetails.description[action.data.key] = action.data.txt;

            return ForDescUpdate;

        case actionTypes.UPDATE_CVE_STATUS:
            let ForcvestatusUpdate = JSON.parse(JSON.stringify(state));

            ForcvestatusUpdate.cvedetails.vuln_status = action.data;

            return ForcvestatusUpdate;

        case actionTypes.SET_SEARCH_CRITERIA:
            let ForSearch = [...state.searchCriteria];

            ForSearch[action.data.index].userValue = action.data.value;

            return { ...state, searchCriteria: [...ForSearch] };

        case actionTypes.ADD_DETECTION:
            let addDetection = JSON.parse(JSON.stringify(state));

            addDetection.cvedetails.detection.push(action.data);

            return addDetection;
        case actionTypes.DEL_DETECTION:
            let delDetection = JSON.parse(JSON.stringify(state));

            delDetection.cvedetails.detection.splice(action.data, 1);

            return delDetection;

        case actionTypes.UPDATE_BASE_METRIC_V2:
            let baseMetric2 = JSON.parse(JSON.stringify(state));

            baseMetric2.cvedetails.basemetricv2_data[action.data.key] = action.data.value;

            return baseMetric2;

        case actionTypes.UPDATE_BASE_METRIC_V3:
            let baseMetric3 = JSON.parse(JSON.stringify(state));

            baseMetric3.cvedetails.basemetricv3_data[action.data.key] = action.data.value;

            return baseMetric3;

        case actionTypes.ADD_NEW_CVE:
            let newCVE = {
                basemetricv2_data: {},
                basemetricv3_data: {},
                cwe_data: { data: [] },
                data_id: '',
                data_type: '',
                description: {},
                detection: [],
                lastmodifieddate: '',
                niahid: '',
                publisheddate: '',
                reference_data: { data: [] },
                revision: '0',
                vuln_status: null
            };

            state.cvedetails = newCVE;

            return { ...state };

        case actionTypes.UPDATE_CVE_DETAILS:
            let cveDdata = JSON.parse(JSON.stringify(state));

            cveDdata.cvedetails[action.data.key] = action.data.value;

            return cveDdata;

        case actionTypes.ADD_BASEMETRIC_V2:
            let basemetricv2 = JSON.parse(JSON.stringify(state));

            basemetricv2.cvedetails.basemetricv2_data[action.data.key] = action.data.value;

            return basemetricv2;

        case actionTypes.ADD_BASEMETRIC_V3:
            let basemetricv3 = JSON.parse(JSON.stringify(state));

            basemetricv3.cvedetails.basemetricv3_data[action.data.key] = action.data.value;

            return basemetricv3;
        case actionTypes.DEL_BASEMETRIC_V2:
            let delbasemetricv2 = JSON.parse(JSON.stringify(state));

            delete delbasemetricv2.cvedetails.basemetricv2_data[action.data.key];

            return delbasemetricv2;

        case actionTypes.DEL_BASEMETRIC_V3:
            let delbasemetricv3 = JSON.parse(JSON.stringify(state));

            delete delbasemetricv3.cvedetails.basemetricv3_data[action.data.key];

            return delbasemetricv3;

        case actionTypes.ADD_UPDATED_CVE_DETAIL_VERSION:
            let updateDetailArray = JSON.parse(JSON.stringify(state));

            updateDetailArray.cvedetailsArray.push(action.data);

            return updateDetailArray;

        case actionTypes.SET_CVE_DETAILS_BY_VERSION:
            let updateDetailArray1 = JSON.parse(JSON.stringify(state));

            updateDetailArray1.cvedetails = state.cvedetailsArray.filter((cve) => cve.revision == action.data)[0];

            return updateDetailArray1;

        case actionTypes.RETURN_CVE_INITIAL_SEARCH:
            {
                /* Product issue 3 : 24/06/2022 */
            }
            let updateCVESearch = JSON.parse(JSON.stringify(state));

            updateCVESearch.searchCriteria.map((search) => (search.userValue = ''));
            return updateCVESearch;

        default:
            return state;
    }
};

const transformRows = (rows) => {
    return rows?.map((row) => {
        return { ...row, cwe_data: row.cwe_data.data[0] };
    });
};

export default cveReducer;
