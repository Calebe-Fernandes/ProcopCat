document.addEventListener('DOMContentLoaded', function() {
  getSubscribersFromLocalStorage();
});

var localSubscribers;

function getSubscribersFromLocalStorage() {
  const storedData = localStorage.getItem('subscribersList');
  localSubscribers = storedData ? JSON.parse(storedData) : [];

  populateTable(localSubscribers);
}

function populateTable(subscribersList) {
  var tableBody = document.querySelector('#subscribers-table tbody');

  tableBody.innerHTML = '';

  if (localSubscribers.length === 0) {
    var row = tableBody.insertRow();
    var cell = row.insertCell(0);
    cell.colSpan = 6;
    cell.textContent = "Ainda não há inscritos.";
    cell.classList.add("center");
  } else if (subscribersList.length === 0) {
    var row = tableBody.insertRow();
    var cell = row.insertCell(0);
    cell.colSpan = 6;
    cell.textContent = "Nenhum inscrito nas condições do filtro";
    cell.classList.add("center");
  }

  subscribersList.forEach(function(subscriber, index) {
    var row = tableBody.insertRow();

    var td1 = row.insertCell(0);
    td1.textContent = subscriber.timestamp;

    var td2 = row.insertCell(1);
    td2.textContent = subscriber.fullName;

    var td3 = row.insertCell(2);
    td3.textContent = subscriber.email;

    var td4 = row.insertCell(3);
    if(subscriber.about) {
      td4.innerHTML = `<i class="fa-solid fa-circle-check"></i> Sim`;
      td4.classList.add("center", "yes");
    } else {
      td4.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Não`;
      td4.classList.add("center", "no");
    }

    var td5 = row.insertCell(4);
    if(subscriber.adoptions) {
      td5.innerHTML = `<i class="fa-solid fa-circle-check"></i> Sim`;
      td5.classList.add("center", "yes");
    } else {
      td5.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Não`;
      td5.classList.add("center", "no");
    }

    var td6 = row.insertCell(5);
    td6.innerHTML = `
      <button onclick="deleteSubscriber(${index})" class="delete-subscriber">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
  });
}

function deleteSubscriber(index) {
  localSubscribers.splice(index, 1);
  localStorage.setItem('subscribersList', JSON.stringify(localSubscribers));
  getSubscribersFromLocalStorage();
}

function deleteAll() {
  localStorage.removeItem('subscribersList');
  getSubscribersFromLocalStorage();
}

function filter() {
  var filterAbout = document.getElementById('filterAbout').value.trim();
  var filterAdoptions = document.getElementById('filterAdoptions').value.trim();

  const filteredSubscribers = localSubscribers.filter(objeto => {
    const aboutCondition = filterAbout === '' || objeto.about.toString() === filterAbout;
    const adoptionsCondition = filterAdoptions === '' || objeto.adoptions.toString() === filterAdoptions;
    return aboutCondition && adoptionsCondition;
  });

  populateTable(filteredSubscribers);
}

function cleanFilter() {
  document.getElementById('filterAbout').value = "";
  document.getElementById('filterAdoptions').value = "";
  populateTable(localSubscribers);
}
