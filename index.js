const data = [{
    "color": "plum",
    "date": "2023-05-01T05:30:31+00:00",
}, {
    "color": "lightblue",
    "date": "2023-05-05T05:58:31+00:00",
}, {
    "color": "lightgreen",
    "date": "2023-05-07T07:05:26+00:00",
}, {
    "color": "plum",
    "date": "2023-05-10T08:19:52+00:00",
}, {
    "color": "lightgreen",
    "date": "2023-05-13T08:31:28+00:00",
}, {
    "color": "orange",
    "date": "2023-05-14T10:21:02+00:00",
}, {
    "color": "plum",
    "date": "2023-05-19T16:50:49+00:00",
}, {
    "color": "lightgreen",
    "date": "2023-05-22T17:04:24+00:00",
}, {
    "color": "lightblue",
    "date": "2023-05-26T17:15:55+00:00",
}, {
    "color": "orange",
    "date": "2023-05-30T17:15:55+00:00",
}]
/* На входе массив с датами и цветом для пометки. 
Надо дозаполнить массив остальными датами месяца, без цвета. 
На странице надо отобразить календарную страницу, с промаркероваными датами. */

function getDaysInMonth(date) {
    date = new Date(Date.parse(date))
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const newDate = new Date(year, month, 1);
    newDate.setDate(newDate.getDate() - 1);
    return newDate.getDate();
}
const days = getDaysInMonth(data[0].date)   /// показывается кол-во дней в указаном месяце

function addDate(arr){
    let newArr = [];
    const date = Date.parse(arr[0].date);
    const year = new Date(date).getFullYear()
    let month = new Date(date).getMonth()+1
    const start = new Date(date).getDate()
    if(month<10){
        month = `0${month}`
    }
    let j = 1
    let i = 0;
    while(j <= days && i < arr.length){
        const el = new Date(Date.parse(arr[i].date)).getDate();
        if(j === el){
            newArr.push(arr[i]);
            i++;
            j++;
        }
        if(j < el){
            let day = j;
            if(j<10){
                day = `0${j}`
            }
            newArr.push({"date": `${year}-${month}-${day}`})
            j++;
        }
    }
    return newArr
}
const fullArr = addDate(data);

const calendar = document.getElementById("calendar");

// Получаем месяц и год
const currentDate = new Date(Date.parse(fullArr[0].date));
const dateString = currentDate.toDateString()

const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const monthElement = document.getElementById("month");

let writeFlag = false;
let monthYear = "";
for (let i = 0; i < dateString.length; i++) {
    const el = dateString[i];
    if(el === " "){
        writeFlag = !writeFlag;
    }
    if(writeFlag){
        monthYear = monthYear + el;
    }
}
monthElement.textContent = `${monthYear}`;

// Определяем, какой день недели был первого дня месяца
const firstDayOfWeek = currentDate.getDay()-1;
// Определяем количество дней в текущем месяце
const daysInMonth = days;

// Создаем массив для дней месяца
const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

// Создаем пустые ячейки для дней недели перед первым днем месяца
for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "day";
    calendar.appendChild(emptyDay);
}

// Добавляем дни месяца в календарь
monthDays.forEach(day => {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.textContent = day;
    
    // Проверяем, есть ли цвет для данной даты
    const dateInfo = fullArr.find(item => {
        const date = new Date(item.date);
        return date.getDate() === day;
    });
    if (dateInfo && dateInfo.color) {
        dayElement.style.backgroundColor = dateInfo.color;
    }
    
    calendar.appendChild(dayElement);
});