let field = document.querySelector('.active-field');
let addBtn = document.getElementById('btn-add');
let subBtn = document.getElementById('submit-btn');
let addWin = document.querySelector('.add-person-window');
let peopleArray = [];
{
  addBtn.addEventListener('click', () => {
    addWin.classList.remove('d-none');
  });
  subBtn.addEventListener('click', () => {
    let addInput = document.querySelector('.form__input');
    let buferPeopleInfo = 0;
    for (let i = 0; i < addInput.length; ++i) {
      buferPeopleInfo += '' + i;
      console.log('!s');
      console.log(buferPeopleInfo);
    }
  });

  function parsePeopleArray() {
    // забираем из массива данные о людях
  }

  function createMainTable() {
    // забираем из массива данные о людях
    // заполняем верхнюю строку названиями столбцов
    // заполняем таблицу данными людей
  }
}
