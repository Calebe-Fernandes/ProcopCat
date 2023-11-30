document.addEventListener('DOMContentLoaded', function() {
  getSubscribersFromLocalStorage();
});

function getSubscribersFromLocalStorage() {
  const storedData = localStorage.getItem('subscribersList');
  return storedData ? JSON.parse(storedData) : [];
}

var subscribersList = getSubscribersFromLocalStorage();

function formatName(word) {
  return word.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}

function saveToLocalStorage(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var lastName = document.getElementById('last-name').value;
  var email = document.getElementById('email').value;
  var about = document.getElementById('about').checked;
  var adoptions = document.getElementById('adoptions').checked;

  var fullName = formatName(name) + ' ' + formatName(lastName);

  email = email.toLowerCase();

  var subscriber = {
    fullName: fullName,
    email: email,
    about: about,
    adoptions: adoptions,
    timestamp: new Date().toLocaleString()
  }

  subscribersList.push(subscriber);

  const JsonSubscribersList = JSON.stringify(subscribersList);
  localStorage.setItem('subscribersList', JsonSubscribersList);
}

var form = document.getElementById('subscription-form');
form.addEventListener('submit', function(event) {
  saveToLocalStorage(event);
  cleanFields();
});

var cleanFieldsButton = document.querySelector('.clean-fields');
cleanFieldsButton.addEventListener('click', cleanFields);

function cleanFields(event) {
  if (event) {
    event.preventDefault();
  }

  document.getElementById('name').value = '';
  document.getElementById('last-name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('about').checked = false;
  document.getElementById('adoptions').checked = false;
}