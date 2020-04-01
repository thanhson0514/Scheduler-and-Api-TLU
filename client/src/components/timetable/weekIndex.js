const today = new Date();const getDay = today.getDate();const getMonth = today.getMonth() + 1;const startYear = today.getFullYear();const startDay = 9;let startMonth = 9;let sum = 0;
const calculatorDate = month => {
  switch (month) {
    case 1:case 3:case 5:case 7:case 8:case 10:case 12:return 31;
    case 4:case 6:case 9:case 11:return 30;
    case 2:return startYear % 4 === 0 && startYear % 100 !== 0 ? 29 : 28;
    default:return 30;
  }
};
for(let i = startMonth + 1; i <= 12; i++){sum += calculatorDate(i);}
for(let i = 1; i < getMonth; i++) {sum += calculatorDate(i);}
sum += 30 - startDay + getDay;let week = parseInt(sum / 7) + 1;
export default week;
