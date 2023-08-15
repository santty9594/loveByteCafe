const moment = require('moment');

export const tableType = (id) => ({
  type: 'SELECT_TABLE_TYPE',
  payload: id
});

export const bookedTable = (id) => ({
  type: 'BOOK_TABLE_NUMBER',
  payload: id
});

export const addEndTime = (model) => async dispatch => {
  try {

    let totalPayAmount = 0
    let tableCharge = 0

    const time1 = model?.selectedTableStartTime;
    const time2 = model?.selectedTableEndTime;
    const totalAmount = model?.totalAmount;

    // Create moment objects for the two times
    const format = 'hh:mm A';
    const momentTime1 = moment(time1, format);
    const momentTime2 = moment(time2, format);

    // Calculate the time difference in minutes
    const minutes = Math.abs(momentTime1.diff(momentTime2, 'minutes'));

    function calculateCharge(minutes) {
      if (minutes) {
        let charge = 0;

        if (minutes <= 70) {
          charge = 100;
        } else if (minutes <= 100) {
          charge = 150;
        } else if (minutes <= 130) {
          charge = 200;
        } else if (minutes <= 160) {
          charge = 250;
        } else if (minutes <= 190) {
          charge = 300;
        }

        return charge;
      }
    }
    const charge = calculateCharge(minutes);

    if (charge && totalAmount) {
      totalPayAmount = totalAmount + charge;
      tableCharge = charge;
    }
    dispatch({ type: 'ADD_END_TIME', payload: { totalPayAmount, tableCharge, totalMinutes: minutes, endTime: time2 } });
  } catch (error) {
    console.log(error)
  }
}
