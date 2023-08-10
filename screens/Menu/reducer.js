const initialState = {
    fetchError: null,
    loginLoading: false,
    selectedMenuCategory: '',
    menusItems: [],
    menuCategory: [],
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


const changeLineItemQty = (state, payload, type) => {
    if (!state || !state.OrderItems) {
        return state;
    }

    const updatedValues = state.OrderItems.map((element) => {
        if (element.id === payload) {
            if (type === 1) {
                var qaty = element.qaty + 1;
                var totalAmount = element.totalAmount + element.value;
            } else {
                var qaty = element.qaty - 1;
                var totalAmount = element.totalAmount - element.value;
            }
            return {
                ...element, qaty: qaty < 0 ? 0 : qaty, totalAmount:totalAmount < 0 ? 0 : totalAmount
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
            const addQty = changeLineItemQty(state, payload, 1);
            return {
                ...state,
                OrderItems: addQty,
            };
        case 'REMOVE_QTY_ITEM':
            const removeQty = changeLineItemQty(state, payload, 0);
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
