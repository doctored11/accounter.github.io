let field = document.querySelector('.active-field');
let addBtn = document.getElementById('btn-add');
let subBtn = document.getElementById('submit-btn');
let addWin = document.querySelector('.add-person-window');
let peopleArray = [];
let people = {
  name: 0,
  surname: 0,
  dadname: 0,
  prof: 0,
  dateY: 0,
  dateD: 0,
  status: 0,
};

{
  createTable();
  printTableBody();

  addBtn.addEventListener('click', () => {
    addWin.classList.remove('d-none');
  });

  let addInput = document.querySelectorAll('.form__input');
  let buferPeopleInfo = 0;

  subBtn.addEventListener('click', () => {
    getPeople();
    printTableBody(-1);
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
          people.name = addInput[i].value;
          break;
        case 1:
          people.surname = addInput[i].value;
          break;
        case 2:
          people.dadname = addInput[i].value;
          break;
        case 3:
          people.prof = addInput[i].value;
          break;
        case 4:
          people.dateY = addInput[i].value;
          break;
        case 5:
          people.dateD = addInput[i].value;
          break;

        case 6:
          people.status = addInput[i].value;
          break;
      }
    }
    peopleArray.push(people);
    console.log(peopleArray);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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

    printTableStroke(thead, Object.keys(people));
  }

  function printTableStroke(tablePart, contentArray) {
    let stroke = document.createElement('tr');
    tablePart.append(stroke);
    for (let i = 0; i < Object.keys(people).length; ++i) {
      let buf = document.createElement('th');
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
}
