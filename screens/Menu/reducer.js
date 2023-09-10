import { PrivateValueStore } from "@react-navigation/native";

const initialState = {
    fetchError: null,
    loginLoading: false,
    selectedMenuCategory: '',
    menusItems: [],
    menuCategory: [],
    selectedMenus: [],
    tempSelectedMenuCount: 0,
};

const addMenuItem = (state, payload) => {
    if (!state || !state.selectedMenus) {
        return state;
    }
    let isObject = state.selectedMenus.find(
        (Item) => Item.id === payload.id && Item.selectedTable === payload.selectedTable
    );
    if (isObject) {
        return state.selectedMenus;
    } else {
        return [...state.selectedMenus, payload];
    }
};


const filterMeuItem = (state, payload) => {
    if (!state || !state.selectedMenus) {
        return state;
    }
    let selectedMenus = state.selectedMenus.filter((Item) => Item.selectedTable !== payload);
    return selectedMenus;
};


function calculateSumById(state, payload) {
    var sum = 0;
    for (const item of state.selectedMenus) {
        if (item.selectedTable === payload.selectedTable && item.qty) {
            sum += 1;
        }
    }
    return sum;
}


const changeLineItemQty = (state, payload, type) => {
    if (!state || !state.selectedMenus) {
        return state;
    }

    const updatedValues = state.selectedMenus.map((element) => {
        if (element.id === payload) {
            var qty, totalAmount;
    
            if (type === 1) {
                qty = element.qty + 1;
                totalAmount = element.totalAmount + element.price;
            } else {
                qty = element.qty - 1;
                totalAmount = element.totalAmount - element.price;
            }
    
            if (qty === 0) {
                return null;
            }
            return { ...element, qty, totalAmount };
        }
        return element;
    }).filter(Boolean); 
    return updatedValues;
};


export default MenuReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'MENU_FETCH_SUCCESS':
            return {
                ...state,
                loginLoading: false,
                menusItems: payload,
            };
        case 'MENU_CATEGORY_FETCH_SUCCESS':
            return {
                ...state,
                loginLoading: false,
                menuCategory: payload,
            };
        case 'GET_TABLE_MENU_COUNT':
            return {
                ...state,
                tempSelectedMenuCount: calculateSumById(state, payload)
            };
        case 'MENU_FETCH_ERROR':
            return {
                ...state,
                loginLoading: false,
                loginSuccess: false,
                loginError: payload,
                loginToken: null,
            };
        case 'ADD_MENU_ITEM':
            return {
                ...state,
                selectedMenus: addMenuItem(state, payload),
                tempSelectedMenuCount: calculateSumById(state, payload)
            };
        case 'ADD_QTY_ITEM':
            const addQty = changeLineItemQty(state, payload, 1);
            return {
                ...state,
                selectedMenus: addQty,
            };
        case 'REMOVE_QTY_ITEM':
            const removeQty = changeLineItemQty(state, payload, 0);
            return {
                ...state,
                selectedMenus: removeQty,
            };
        case 'RESET_MENU_AGAINST_TABLE':
            return {
                ...state,
                selectedMenus: filterMeuItem(state, payload),
            };
        default:
            return state;
    }
};
