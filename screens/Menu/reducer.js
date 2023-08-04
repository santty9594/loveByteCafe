const initialState = {
    fetchError: null,
    loginLoading: false,
    selectedMenuCategory: '',
    menusItems: [],
    menuCategory: [],
    OrderItems: [
        { key: 1, name: 'Samosha', qaty: 1, value: 10, id: 1 },
        { key: 2, name: 'Samosha1', qaty: 1, value: 10, id: 2 },
        { key: 3, name: 'Samosha2', qaty: 1, value: 10, id: 3 },
        { key: 4, name: 'Samosha3', qaty: 1, value: 10, id: 4 },
        { key: 5, name: 'Samosha1', qaty: 1, value: 10, id: 5 },
        { key: 6, name: 'Samosha2', qaty: 1, value: 10, id: 6 },
        { key: 7, name: 'Samosha3', qaty: 1, value: 10, id: 7 }
    ]
};


const changeLineItemQty = (state, payload) => {
    if (!state || !state.tableList) {
        return state;
    }

    const updatedValues = state.OrderItems.map((element) => {
        if (element.value === payload) {
            return {
                ...element,
                qaty: element.booked + 1,
                value: value * qaty
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

        case 'ADD_QTY_ITEM':
            const addQty = changeTableValues(state, payload);
            return {
                ...state,
                OrderItems: addQty,
            };
        case 'REMOVE_QTY_ITEM':
            const removeQty = changeTableValues(state, payload);
            return {
                ...state,
                OrderItems: removeQty,
            };
        case 'AUTH_LOGOUT_RESET':
            return initialState;
        default:
            return state;
    }
};
