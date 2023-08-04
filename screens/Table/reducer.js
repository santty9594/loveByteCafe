
const initialState = {
  tableList: [
    // couple
    { key: 1, name: "1", value: 100, waiting: false, booked: false, payment: false, tableType: 1 },
    { key: 2, name: "2", value: 101, waiting: false, booked: false, payment: false, tableType: 1 },
    { key: 3, name: "3", value: 102, waiting: false, booked: false, payment: false, tableType: 1 },
    { key: 4, name: "4", value: 103, waiting: false, booked: false, payment: false, tableType: 1 },
    { key: 5, name: "5", value: 104, waiting: false, booked: false, payment: false, tableType: 1 },
    { key: 6, name: "6", value: 105, waiting: false, booked: false, payment: false, tableType: 1 },
    { key: 7, name: "7", value: 106, waiting: false, booked: false, payment: false, tableType: 1 },
    { key: 8, name: "8", value: 107, waiting: false, booked: false, payment: false, tableType: 1 },

   //Normal
    { key: 9, name: "1", value: 108, waiting: false, booked: false, payment: false, tableType: 2 },
    { key: 10, name: "2", value: 109, waiting: false, booked: false, payment: false, tableType: 2 },
    { key: 11, name: "3", value: 110, waiting: false, booked: false, payment: false, tableType: 2 },
    { key: 12, name: "4", value: 111, waiting: false, booked: false, payment: false, tableType: 2 },
    { key: 13, name: "5", value: 112, waiting: false, booked: false, payment: false, tableType: 2 },

    //Birthday
    { key: 14, name: "1", value: 113, waiting: false, booked: false, payment: false, tableType: 3 },
    { key: 15, name: "2", value: 114, waiting: false, booked: false, payment: false, tableType: 4 },


  ],
  tabel: {

  },
  selectCategory: 0
};

const changeTableValues = (state, payload) => {
  if (!state || !state.tableList) {
    return state;
  }

  const updatedValues = state.tableList.map((element) => {
    if (element.value === payload) {
      return {
        ...element,
        booked: !element.booked,
      };
    }
    return element;
  });
  return updatedValues;
};

const TableReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SELECT_TABLE_TYPE':
      return {
        ...state,
        tableList: state.tableList,
        selectCategory: payload,
      };
    case 'BOOK_TABLE_NUMBER':
      const values = changeTableValues(state, payload);
      return {
        ...state,
        tableList: values,
      };
    default:
      return state;
  }
};


export default TableReducer;