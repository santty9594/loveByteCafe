
const initialState = {
  tableList: [
    // couple
    { key: 1, name: "1", value: 100, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },
    { key: 2, name: "2", value: 101, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },
    { key: 3, name: "3", value: 102, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },
    { key: 4, name: "4", value: 103, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },
    { key: 5, name: "5", value: 104, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },
    { key: 6, name: "6", value: 105, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },
    { key: 7, name: "7", value: 106, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },
    { key: 8, name: "8", value: 107, waiting: false, booked: false, payment: false, startTime: null, tableType: 1 },

    //Normal
    { key: 9, name: "1", value: 108, waiting: false, booked: false, payment: false, startTime: null, tableType: 2 },
    { key: 10, name: "2", value: 109, waiting: false, booked: false, payment: false, startTime: null, tableType: 2 },
    { key: 11, name: "3", value: 110, waiting: false, booked: false, payment: false, startTime: null, tableType: 2 },
    { key: 12, name: "4", value: 111, waiting: false, booked: false, payment: false, startTime: null, tableType: 2 },
    { key: 13, name: "5", value: 112, waiting: false, booked: false, payment: false, startTime: null, tableType: 2 },

    //Birthday
    { key: 14, name: "1", value: 113, waiting: false, booked: false, payment: false, startTime: null, tableType: 3 },
  ],

  selectedTable: 0,
  selectCategory: 0,
  totalAmount: 0,
  order_amount: 0,
  totalPayAmount: 0,
  order_in_time: '',
  order_out_time: '',
  tableCharge: 0,
  totalMinutes: '0',
  selectedTableStartTime: 0,
  selectedTableEndTime: 0,
};

const updateTableValues = (tableList, payload, updateFn) => {
  return tableList.map((element) => {
    if (element.value === payload) {
      return updateFn({ ...element });
    }
    return element;
  });
};


const shiftTableValue = (state, payload) => {
  if (!state || !state.tableList) {
    return state;
  }

  const shitValue = payload.shitValue;
  const resetValue = payload.resetValue;

  let tempObject = {}

  const updatedValues = state.tableList.map((element) => {
    if (element.value === resetValue) {
      tempObject = element;
      return { ...element, waiting: false, booked: false, payment: false, startTime: null };
    }
    if (element.value === shitValue) {
      return {
        ...element,
        waiting: tempObject.waiting || false,
        booked: tempObject.booked || false,
        startTime: tempObject.startTime || null
      };
    }
    return element;
  }).filter(Boolean);
  return updatedValues;
};

const TableReducer = (state = initialState, { type, payload }) => {
  if (!state || !state.tableList) {
    return state;
  }

  switch (type) {
    case 'SELECT_TABLE_TYPE':
      return {
        ...state,
        selectCategory: payload,
      };
    case 'BOOK_TABLE_NUMBER':
      return {
        ...state,
        tableList: updateTableValues(state.tableList, payload, (element) => ({
          ...element,
          booked: true,
          startTime: element.startTime === null ? new Date() : element.startTime,
        })),
        selectedTable: payload,
      };
    case 'GET_START_TIME_TABLE':
      const startTime = state.tableList.find((item) => item.value === payload)?.startTime || new Date();
      return {
        ...state,
        selectedTableStartTime: startTime,
      };
    case 'RESET_TABLE_NUMBER':
      return {
        ...state,
        tableList: updateTableValues(state.tableList, payload, (element) => ({
          ...element,
          booked: false,
          startTime: null,
          waiting: false,
          payment: false,
        })),
        selectedTable: 0,
        totalAmount: 0,
        order_amount: 0,
        order_in_time: '',
        order_out_time: '',
        totalPayAmount: 0,
        tableCharge: 0,
        totalMinutes: '0',
        selectedTableEndTime: 0,
      };
    case 'SHIT_TABLE_NUMBER':
      return {
        ...state,
        tableList: shiftTableValue(state, payload),
        selectedTable: payload?.shitValue,
      };
    case 'ADD_START_TIME':
      return {
        ...state,
        tableList: updateTableValues(state.tableList, payload.selectedTable, (element) => ({
          ...element,
          startTime: payload.startTime,
        })),
        selectedTableStartTime: payload.startTime,
      };
    case 'ADD_END_TIME':
      return {
        ...state,
        selectedTableEndTime: payload.endTime,
        tableCharge: payload.tableCharge,
        totalPayAmount: payload.totalPayAmount,
        totalMinutes: payload.totalMinutes,
        order_in_time: payload.order_in_time,
        order_out_time: payload.order_out_time,
        order_amount: payload.order_amount,
      };
    case 'TABLE_PLACE_ORDER':
      return {
        ...state,
        totalAmount: payload,
        order_in_time: '',
        order_out_time: '',
        order_amount: 0,
        totalPayAmount: 0,
        totalMinutes: 0,
      };
    default:
      return state;
  }
};

export default TableReducer;