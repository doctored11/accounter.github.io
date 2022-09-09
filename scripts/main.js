let field = document.querySelector('.active-field');
let addBtn = document.getElementById('btn-add');
let subBtn = document.getElementById('submit-btn');
let addWin = document.querySelector('.add-person-window');
let peopleArray = [];
let buferArray = [];
let statusI = {};

const people = {
  name: 0,
  prof: 0,
  birthDay: 0,
  dayDeth: 0,
  status: 0,
  rentTime: 0,
};
console.log(people);

{
  createTable();
  printTableBody();
  addSortClick();

  addBtn.addEventListener('click', () => {
    addWin.classList.remove('d-none');
  });

  let filterBtn = document.querySelector('.filter-ico');
  let btnClose = document.querySelector('.btn-close');
  btnClose.addEventListener('click', () => {
    addWin.classList.add('d-none');
  });
  let filtersSet = document.querySelector('.filters__settings');
  filterBtn.addEventListener('click', () => {
    filtersSet.classList.toggle('d-none');
    filterBtn.classList.toggle('filter-ico--active');
  });

  let filterInput = document.querySelectorAll('.filter-input');

  for (let i = 0; i < filterInput.length; ++i) {
    filterInput[i].addEventListener('input', () => {
      statusI[i] > filterInput[i].value.length ? (bool = false) : (bool = true);

      statusI[i] = filterInput[i].value.length;

      liveFilt(filterInput[i].id, filterInput[i].value, bool);
    });
  }

  let addInput = document.querySelectorAll('.form__input');
  let buferPeopleInfo = 0;

  subBtn.addEventListener('click', () => {
    let errors = document.querySelectorAll('.just-validate-error-label');
    console.log(addInput[0].value.trim() == '');
    console.log(errors);
    let empty = false;
    let tryFormat = true;
    console.log(addInput);
    for (let i = 0; i < addInput.length - 1; ++i) {
      addInput[i].value.trim() != '' ? (empty = false) : (empty = true);
      console.log(addInput[i].value.trim());
      addInput[i].value.trim().length >= 3 ? (tryFormat = true) : (tryFormat = false);
      Number(addInput[4].value.split('.')[2]) >= 1800
        ? (tryFormat = true)
        : (tryFormat = false);
      Number(addInput[4].value.split('.')[2]) <= Number(addInput[5].value.split('.')[2])
        ? (tryFormat = true)
        : (tryFormat = false);
      Number(addInput[5].value.split('.')[2]) <= 2022
        ? (tryFormat = true)
        : (tryFormat = false);
    }

    console.log(empty, tryFormat, errors.length);
    if (errors.length < 1 && empty != true && tryFormat == true) {
      getPeople();
      printTableBody(-1);
      addWin.classList.add('d-none');
    }
  });

  //   ------------------------------------------------------------------------------
  //            ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //   ------------------------------------------------------------------------------

  function getPeople() {
    peopleArray = JSON.parse(localStorage.getItem('listtest')) || [];
    for (let i = 0; i < addInput.length; ++i) {
      console.log(peopleArray);

      switch (i) {
        case 0:
          people.name =
            addInput[i].value.trim() +
            ' ' +
            addInput[i + 1].value.trim() +
            ' ' +
            addInput[i + 2].value.trim();
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          people.prof = addInput[i].value.trim();
          break;
        case 4:
          people.birthDay = addInput[i].value.trim();
          break;
        case 5:
          people.dayDeth = addInput[i].value.trim();
          people.dayDeth = addInput[i].value.trim() + ` (${getLifePeriod(people)}y.o)`;
          break;
        case 6:
          people.status = addInput[i].value;
          people.rentTime = getRentTime(people);
          break;
      }
    }

    peopleArray.push(people);

    localStorage.setItem('listtest', JSON.stringify(peopleArray));
  }
  function getPeopleArray() {
    peopleArray = JSON.parse(localStorage.getItem('listtest')) || [];
  }

  function parsePeopleArray() {
    // забираем из массива данные о людях
  }

  function createMainTable() {
    // забираем из массива данные о людях
    // заполняем верхнюю строку названиями столбцов
    // заполняем таблицу данными людей
  }
  function createTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tstroke = document.createElement('tr');
    const tbody = document.createElement('tbody');
    tbody.classList.add('mainTableBody');

    field.append(table);
    table.append(thead);
    table.append(tbody);
    thead.append(tstroke);
    className = 'heading-name';

    printTableStroke(thead, Object.keys(people), className);
  }

  function printTableStroke(tablePart, contentArray, className = 'cell-name') {
    let stroke = document.createElement('tr');
    tablePart.append(stroke);
    for (let i = 0; i < Object.keys(people).length; ++i) {
      let buf = document.createElement('th');
      buf.classList.add(className);

      buf.textContent = `${contentArray[i]}`;
      stroke.append(buf);
    }
  }

  function tableClearVisualFull(tablePart) {
    let buf = tablePart.childNodes.length;
    for (let i = 0; i < buf; ++i) {
      tablePart.childNodes[0].remove();
    }
  }

  function printTableBody(n) {
    getPeopleArray();
    const tbody = document.querySelector('.mainTableBody');

    n == -1 ? (buf = peopleArray.length - 1) : (buf = 0);

    for (let i = buf; i < peopleArray.length; ++i) {
      printTableStroke(tbody, Object.values(peopleArray[i]));
    }
  }
  function getLifePeriod(people) {
    // let nowTime= new Date();
    // console.log(nowTime.getFullYear());
    let a = people.dayDeth.split('.');
    let b = people.birthDay.split('.');
    return a[a.length - 1] - b[b.length - 1];
  }
  function getRentTime(people) {
    let a = people.dayDeth.split('(');
    let b = a[0].split('.');
    let nowTime = new Date();

    return nowTime.getFullYear() - b[b.length - 1];
  }

  function addSortClick() {
    let sortBtn = document.querySelectorAll('.heading-name');
    for (let i = 0; i < sortBtn.length; ++i) {
      let dir = false;

      sortBtn[i].addEventListener('click', () => {
        dir = !dir;
        let sortArr = [];
        buferArray.length > 0
          ? (sortArr = [...buferArray])
          : (sortArr = [...peopleArray]);
        multiSort(sortArr, `${sortBtn[i].textContent}`, dir);
      });
    }
  }

  function liveFilt(standart, stValue, bool) {
    clearTimeout(print);
    print = setTimeout(() => {
      let sortArr = [];
      buferArray.length > 0 ? (sortArr = [...buferArray]) : (sortArr = [...peopleArray]);
      bool == true ? (sortArr = [...buferArray]) : (sortArr = [...peopleArray]);

      filter(sortArr, standart, stValue);
    }, 250);
  }

  function filter(arr, standart, stValue) {
    if (stValue == '') arr = peopleArray;
    const arrayCopy = [...arr];
    stValue = stValue.trim();
    standart = standart.trim();

    for (let i = 0; i < arrayCopy.length; ++i) {
      if (String(arrayCopy[i][standart]).includes(stValue)) {
        console.log('!'); //  подходит по фильтру
      } else {
        arrayCopy.splice(i, 1);
        i--;
      }
    }
    let tbody = document.querySelector('.mainTableBody');
    tableClearVisualFull(tbody);
    let result = arrayCopy;
    for (let i = 0; i < result.length; ++i) {
      printTableStroke(tbody, Object.values(result[i]));
    }
    buferArray = result;
    if (stValue == '') {
      for (let i = 0; i < filterInput.length; ++i) {
        if (filterInput[i].value.trim() != '') {
          liveFilt(filterInput[i].id, filterInput[i].value);
        }
      }
    }
  }
  // селект стилизация
  console.log(5);
  const element = document.querySelector('.select');
  const choices = new Choices(element, {
    searchEnabled: false,
    allowHTML: true,
    searchChoices: true,
    placeholder: true,
    itemSelectText: '',
  });
}

function multiSort(arr, prop, metod = false) {
  const arrayCopy = [...arr];

  let result = arrayCopy.sort(function (a, b) {
    let sortMetod;

    metod == false ? (sortMetod = a[prop] < b[prop]) : (sortMetod = a[prop] > b[prop]);

    if (sortMetod == true) {
      return -1;
    }
  });

  let tbody = document.querySelector('.mainTableBody');
  tableClearVisualFull(tbody);

  for (let i = 0; i < result.length; ++i) {
    printTableStroke(tbody, Object.values(result[i]));
  }

  return result;
}

//
var selector = document.querySelectorAll("input[type='dat']");

var im = new Inputmask('99.99.9999');
im.mask(selector);

//
const validation = new JustValidate('#form');

validation
  .addField('#name1', [
    {
      rule: 'required',
      errorMessage: 'Name is required 😡',
    },
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#name2', [
    {
      rule: 'required',
      errorMessage: 'Name is required 😡',
    },
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#name3', [
    {
      rule: 'required',
      errorMessage: 'Name is required 😡',
    },
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#date', [
    {
      rule: 'required',
      errorMessage: 'date is required 😡',
    },
    {
      validator: (name, value) => {
        let date = selector[0].inputmask.unmaskedvalue();

        let buf =
          date[date.length - 4] +
          date[date.length - 3] +
          date[date.length - 2] +
          date[date.length - 1];
        let bufM = date[date.length - 6] + date[date.length - 5];
        let bufВ = date[0] + date[1];

        console.log(buf);
        buf = Number(buf);
        let nowTime = new Date();
        if (
          buf > 1700 &&
          buf < 2025 &&
          buf <= nowTime.getFullYear() &&
          bufM <= 12 &&
          bufM > 0 &&
          bufВ < 32
        ) {
          return true;
        } else {
          return false;
        }
      },
      errorMessage: 'bad format',
    },
  ])
  .addField('#date2', [
    {
      rule: 'required',
      errorMessage: 'date is required 😡',
    },
    {
      validator: (name, value) => {
        let date2 = selector[1].inputmask.unmaskedvalue();

        let buf =
          date2[date2.length - 4] +
          date2[date2.length - 3] +
          date2[date2.length - 2] +
          date2[date2.length - 1];
        let bufM = date2[date2.length - 6] + date2[date2.length - 5];
        let bufВ = date2[0] + date2[1];
        console.log(buf);
        buf = Number(buf);
        let nowTime = new Date();

        if (
          buf > 1700 &&
          buf <= nowTime.getFullYear() &&
          bufM <= 12 &&
          bufM > 0 &&
          bufВ < 32
        ) {
          return true;
        } else {
          return false;
        }
      },
      errorMessage: 'bad format2',
    },
  ]);
