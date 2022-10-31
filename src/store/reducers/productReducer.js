import * as actionTypes from '../actions';

const initalState = {
    columns: [],
    rows: [],
    rawData: {},
    productDetails: {},
    productdetailsArray: [],
    searchCriteria: [
        { value: 'product', label: 'Product', userValue: '' },
        { value: 'vendor', label: 'Vendor', userValue: '' },
        { value: 'advisory', label: 'Advisory', userValue: '' },
        { value: 'niah_product_id', label: 'Niah Product Id', userValue: '' },
        { value: 'vuln_status', label: 'Vuln Status', userValue: '' },
        { value: 'key', label: 'key', userValue: '' },
        { value: 'value', label: 'value', userValue: '' }
    ]
};

const ProductReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCT_DATA:
            return {
                ...state,
                rawData: action.data,
                columns: action.data.columns,
                rows: action.data.results
            };

        case actionTypes.SET_SELECTED_PROUDCT:
            let sortedData = action.data.sort((a, b) => a.revision - b.revision);
            return {
                ...state,
                productDetails: JSON.parse(JSON.stringify(sortedData[sortedData.length - 1])),
                productdetailsArray: JSON.parse(JSON.stringify(sortedData))
            };

        case actionTypes.UPDATE_META_DATA:
            let ForMetaUpdate = JSON.parse(JSON.stringify(state));

            ForMetaUpdate.productDetails.meta_data[action.data.key] = action.data.txt;

            state.productDetails = ForMetaUpdate;

            return ForMetaUpdate;

        case actionTypes.UPDATE_PRODUCT_STATUS:
            let ForcvestatusUpdate = JSON.parse(JSON.stringify(state));

            ForcvestatusUpdate.productDetails.vuln_status = action.data;

            state.productDetails = ForcvestatusUpdate;

            return ForcvestatusUpdate;

        case actionTypes.ADD_META_DATA:
            let ForaddMetaData = JSON.parse(JSON.stringify(state));

            ForaddMetaData.productDetails.meta_data[action.data.key] = action.data.value;

            state.productDetails = ForaddMetaData;

            return ForaddMetaData;

        case actionTypes.DEL_META_DATA:
            let delMetaData = JSON.parse(JSON.stringify(state));

            delete delMetaData.productDetails.meta_data[action.data.key];

            state.productDetails = delMetaData;

            return delMetaData;

        case actionTypes.ADD_PRODUCT:
            let addProduct = {
                advisory: '',
                meta_data: {},
                niah_product_id: '',
                product: '',
                revision: '0',
                type: '',
                vendor: '',
                vuln_status: null
            };

            state.productDetails = addProduct;

            return { ...state };

        case actionTypes.UPDATE_NON_DATA:
            let updateNonMeta = JSON.parse(JSON.stringify(state));

            updateNonMeta.productDetails[action.data.key] = action.data.txt;

            state.productDetails = updateNonMeta;

            return updateNonMeta;

        case actionTypes.ADD_UPDATED_PRODUCT_DETAIL_VERSION:
            let updateDetailArray = JSON.parse(JSON.stringify(state));

            updateDetailArray.productdetailsArray.push(action.data);

            return updateDetailArray;
        case actionTypes.SET_PRODUCT_DETAILS_BY_VERSION:
            let updateDetailArray1 = JSON.parse(JSON.stringify(state));

            updateDetailArray1.productDetails = state.productdetailsArray.filter((product) => product.revision == action.data)[0];

            return updateDetailArray1;

        case actionTypes.RETURN_PRODUCT_INITIAL_SEARCH:
            {
                /* Product issue 3 : 24/06/2022 */
            }
            let updateSearchValues = JSON.parse(JSON.stringify(state));

            updateSearchValues.searchCriteria.map((search) => (search.userValue = ''));
            return updateSearchValues;
        default:
            return state;

        case actionTypes.SET_PRODUCT_SEARCH_CRITERIA:
            let ForSearch = [...state.searchCriteria];

            ForSearch[action.data.index].userValue = action.data.value;

            return { ...state, searchCriteria: [...ForSearch] };
    }
};

const transformRows = (rows) => {
    return rows.map((row) => {
        return { ...row, cwe_data: row.cwe_data.data[0] };
    });
};

export default ProductReducer;
