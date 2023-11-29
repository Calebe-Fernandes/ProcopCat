document.addEventListener('DOMContentLoaded', function() {
  var subscribersList = [];

  function saveToLocalStorage(event) {
    event.preventDefault();
  
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var about = document.getElementById('about').checked;
    var adoptions = document.getElementById('adoptions').checked;
  
    var subscriber = {
      fullName: name + ' ' + lastName,
      email: email,
      about: about,
      adoptions: adoptions
    }
  
    subscribersList.push(subscriber);
  
    const JsonSubscribersList = JSON.stringify(subscribersList);
    localStorage.setItem('subscribersList', JsonSubscribersList);
  }

  var form = document.getElementById('subscription-form');
  form.addEventListener('submit', function(event) {
    saveToLocalStorage(event);
  });
});

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

  subscribersList.forEach(function(subscriber, index) {
    var row = tableBody.insertRow();

    var td1 = row.insertCell(0);
    td1.textContent = subscriber.fullName;

    var td2 = row.insertCell(1);
    td2.textContent = subscriber.email;

    var td3 = row.insertCell(2);
    if(subscriber.about) {
      td3.innerHTML = `<i class="fa-solid fa-circle-check"></i> Sim`;
      td3.classList.add("center", "yes");
    } else {
      td3.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Não`;
      td3.classList.add("center", "no");
    }

    var td4 = row.insertCell(3);
    if(subscriber.adoptions) {
      td4.innerHTML = `<i class="fa-solid fa-circle-check"></i> Sim`;
      td4.classList.add("center", "yes");
    } else {
      td4.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Não`;
      td4.classList.add("center", "no");
    }

    var td5 = row.insertCell(4);
    td5.innerHTML = `
      <button onclick="deleteSubscriber(${index})" class="delete-subscriber">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
  });
}

function deleteSubscriber(index) {
  var subscribersList = getSubscribersFromLocalStorage();
  subscribersList.splice(index, 1);
  localStorage.setItem('subscribersList', JSON.stringify(subscribersList));
  populateTable();
}

function deleteAll() {
  localStorage.removeItem('subscribersList');
  populateTable();
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
  populateTable(localSubscribers);
}

