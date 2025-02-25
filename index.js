/**
 * @typedef Person
 * @type {object}
 * @property {string} name - имя
 * @property {string} birthdate - дата рождения
 */

/**
 * @typedef Gift
 * @type {object}
 * @property {string} title - название подарка
 * @property {number} price - стоимость подарка
 */

/**
 * @param {string} date - дата отсчета
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<Person>} массив друзей, у которых дни рождения после даты отсчета
 */


function getNextBirthdays(date, phoneList) {
    if(checkDateCorrect(date) == false || !Array.isArray(phoneList) || phoneList.length === 0) return [];
    
    const splitDate = date.split('.');
    const startDate = getObjectDate(date);
     
    var filterPhoneList = phoneList.filter((e) => {
        const friendDate = getObjectDate(e.birthdate);

        if(friendDate.getFullYear() <= startDate.getFullYear()){
            if(friendDate.getMonth() > startDate.getMonth()) return e;
      
            if(friendDate.getMonth() === startDate.getMonth())
              if(friendDate.getDate() >= startDate.getDate()) return e;
          }
    });
    return filterPhoneList.sort((a, b) => {
        const friend1 = getObjectDate(a.birthdate);
        const friend2 = getObjectDate(b.birthdate);

        return friend2 - friend1;
        });
    
    
};

function checkDateCorrect(date){
    if(typeof(date) !== "string" || date.length === 0) return false; 
    
    const splitedDate = date.split('.');
    if (splitedDate.length != 3 && splitedDate[0].length != 2 && splitedDate[1].length != 2 &&
    splitedDate[2].length != 4) return false;
    }




function getObjectDate(date) {
    const splitDate = date.split('.');
    return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
    }


/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */


function getMonthsList(phoneList) {
    if (!Array.isArray(phoneList) || phoneList.length === 0) return [];
    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  
    const birthdaysList = months.map((e) => {
      return {month: e, friends: []}
    });

    phoneList.forEach((e) => {
        const month = getObjectDate(e.birthdate).getMonth();
        birthdaysList[month].friends.push(e);
      })
    
      return birthdaysList.filter((e) => {
        if(e.friends.length !== 0) return e;
      });
}


/**
 * @param {Array<{
 *    name: string,
 *    birthdate: string,
 *    wishList: Array<Gift>
 *  }>} phoneList - список друзей из телефонной книги
 * @returns {{
 *    friendsList: Array<{
 *      name: string,
 *      birthdate: string,
 *      present: Gift
 *    }>,
 *    totalPrice: number
 *  }}
 */


function getMinimumPresentsPrice(phoneList) {
    if(!Array.isArray(phoneList)) return [];

    const friendsPresentsList = { 
    friendsList: [], 
    totalPrice: 0
    };

    phoneList.forEach((e) => {
        if(e.hasOwnProperty('wishList') && Array.isArray(e.wishList) && e.wishList.length !== 0){
            e.wishList.sort((a, b) => {
            return a.price - b.price;
        });

        e.present = e.wishList[0];
        delete e.wishList;
        friendsPresentsList.friendsList.push(e);
        friendsPresentsList.totalPrice += Number(e.present.price);
    }
        else {
            e.present = undefined;
        delete e.wishList;
        friendsPresentsList.friendsList.push(e);
        }
    });
  
    return friendsPresentsList;
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };

