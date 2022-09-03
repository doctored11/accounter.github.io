let field = document.querySelector('.active-field');
let addBtn = document.getElementById('btn-add');
let subBtn = document.getElementById('submit-btn');
let addWin = document.querySelector('.add-person-window');
let peopleArray = [];
const people = {
  name: 0,
  prof: 0,
  dateY: 0,
  dateD: 0,
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

  let addInput = document.querySelectorAll('.form__input');
  let buferPeopleInfo = 0;

  subBtn.addEventListener('click', () => {
    let errors = document.querySelectorAll('.just-validate-error-label');
    console.log(addInput[0].value.trim() == '');
    console.log(errors);
    if (
      errors.length < 1 &&
      addInput[0].value.trim() != '' &&
      addInput[2].value.trim() != '' &&
      addInput[4].value.trim() != ''
    ) {
      getPeople();
      printTableBody(-1);
    }
  });

  //   ------------------------------------------------------------------------------
  //            ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //   ------------------------------------------------------------------------------

  function getPeople() {
    peopleArray = JSON.parse(localStorage.getItem('listtest')) || [];
    for (let i = 0; i < addInput.length; ++i) {
      console.log(peopleArray);
      //   console.log(addInput[i].value);
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
          people.dateY = addInput[i].value.trim();
          break;
        case 5:
          people.dateD = addInput[i].value.trim();
          people.dateD = addInput[i].value.trim() + ` (${getLifePeriod(people)}y.o)`;
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
    let a = people.dateD.split('.');
    let b = people.dateY.split('.');
    return a[a.length - 1] - b[b.length - 1];
  }
  function getRentTime(people) {
    let a = people.dateD.split('(');
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

        multiSort(peopleArray, `${sortBtn[i].textContent}`, dir);
      });
    }
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

        console.log(buf);
        buf = Number(buf);
        if (buf > 1700 && buf < 2025) {
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

        console.log(buf);
        buf = Number(buf);
        let nowTime = new Date();

        if (buf > 1700 && buf <= nowTime.getFullYear()) {
          return true;
        } else {
          return false;
        }
      },
      errorMessage: 'bad format2',
    },
  ]);
