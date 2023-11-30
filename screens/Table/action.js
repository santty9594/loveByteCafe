import { TableApi } from './api';
import { chargeTable } from '../../constants/api_constants';
const moment = require('moment');

const api = new TableApi();

export const tableType = (id) => ({
  type: 'SELECT_TABLE_TYPE',
  payload: id
});

export const bookedTable = (id) => async dispatch => {
  try {
    dispatch({ type: 'BOOK_TABLE_NUMBER', payload: id });
    dispatch({ type: 'GET_TABLE_MENU_COUNT', payload: { selectedTable: id } });
  } catch (error) {
    console.log(error)
  }
}

export const resetTable = (id) => async dispatch => {
  try {
    dispatch({ type: 'RESET_TABLE_NUMBER', payload: id });
    dispatch({ type: 'RESET_MENU_AGAINST_TABLE', payload: id });
  } catch (error) {
    console.log(error)
  }
}

export const addEndTime = (model) => async dispatch => {
  try {

    let totalPayAmount = 0
    let tableCharge = 0

    const time1 = model?.selectedTableStartTime;
    const time2 = model?.selectedTableEndTime;


    const totalAmount = model?.totalAmount;

    const format = 'hh:mm A';
    const momentTime1 = moment(time1, format);
    const momentTime2 = moment(time2, format);

    const minutes = Math.abs(momentTime1.diff(momentTime2, 'minutes'));

    function calculateCharge(minutes) {

      let charge = 0;
      if (minutes) {
        for (const threshold in chargeTable) {
          if (minutes <= parseInt(threshold)) {
            charge = chargeTable[threshold];
            break;
          }
        }
      }
      return charge;
    }

    const charge = calculateCharge(minutes);

    if (totalAmount) {
      totalPayAmount = totalAmount + charge;
      tableCharge = charge;
    }


    const order_in_time = time1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const order_out_time = time2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    dispatch({
      type: 'ADD_END_TIME',
      payload: {
        totalPayAmount, tableCharge,
        order_amount: totalAmount,
        totalMinutes: minutes, endTime: time2,
        order_in_time, order_out_time
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export const makePayment = (model, value) => async dispatch => {
  try {
    var temp = await api.makePayment(model);
    return temp;
  } catch (error) {
    dispatch({ type: "AUTH_REGISTER_ERROR", error });
  }
}