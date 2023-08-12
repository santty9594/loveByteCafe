
const initialState = {
    fetchError: null,
    loginLoading: false,
    selectedMenuCategory: '',
    menusItems: [],
    menuCategory: [],
    selectedMenus: [],
    tempSelectedMenuCount: 0,
    OrderItems: [
        { key: 1, name: 'Samosha', qaty: 1, value: 10, totalAmount: 10, id: 1 },
        { key: 2, name: 'Samosha1', qaty: 1, value: 10, totalAmount: 10, id: 2 },
        { key: 3, name: 'Samosha2', qaty: 1, value: 10, totalAmount: 10, id: 3 },
        { key: 4, name: 'Samosha3', qaty: 1, value: 10, totalAmount: 10, id: 4 },
        { key: 5, name: 'Samosha1', qaty: 1, value: 10, totalAmount: 10, id: 5 },
        { key: 6, name: 'Samosha2', qaty: 1, value: 10, totalAmount: 10, id: 6 },
        { key: 7, name: 'Samosha3', qaty: 1, value: 10, totalAmount: 10, id: 7 }
    ]
};


const addMenuItem = (state, payload) => {
    if (!state || !state.selectedMenus) {
        return state;
    }
    let isObject = state.selectedMenus.find((Item) => Item.id === payload.id);
    if (isObject) {
        return state.selectedMenus;
    } else {
        return [...state.selectedMenus, payload];
    }
};


function calculateSumById(state, payload) {
    let sum = 0;
    for (const item of state.selectedMenus) {
        if (item.selectedTable === payload.selectedTable) {
            sum = sum + 1;
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
            if (type === 1) {
                var qty = element.qty + 1;
                var totalAmount = element.totalAmount + element.price;
            } else {
                var qty = element.qty - 1;
                var totalAmount = element.totalAmount - element.price;
            }
            return {
                ...element, qty: qty < 0 ? 0 : qty, totalAmount: totalAmount < 0 ? 0 : totalAmount
            };
        }
        return element;
    });
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
        case 'AUTH_LOGOUT_RESET':
            return initialState;
        default:
            return state;
    }
};
