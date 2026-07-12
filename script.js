const password = document.querySelector('#password');
const toggle = document.querySelector('.visibility-toggle');
const loginForm = document.querySelector('.login-form');
const loginInput = loginForm.elements.login;
const loginError = document.querySelector('.login-error');
const loginView = document.querySelector('.login-view');
const buildingsView = document.querySelector('.buildings-view');
const logoutButton = document.querySelector('.logout-button');
const buildingOptions = document.querySelectorAll('.building-option');
const taskOptions = document.querySelectorAll('.choose-task');
const taskDetailsView = document.querySelector('.task-details-view');
const taskTitle = document.querySelector('#task-title');
const taskStatus = document.querySelector('.task-status strong');
const returnButton = document.querySelector('.return-button');
const detailLogoutButton = taskDetailsView.querySelector('.logout-button');

toggle.addEventListener('click', () => {
  const isHidden = password.type === 'password';
  password.type = isHidden ? 'text' : 'password';
  toggle.setAttribute('aria-pressed', String(isHidden));
  toggle.setAttribute('aria-label', isHidden ? 'Ukryj hasło' : 'Pokaż hasło');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = loginInput.value.trim().toLowerCase() === 'adam' && password.value === '123';

  if (!isValid) {
    loginError.hidden = false;
    return;
  }

  loginError.hidden = true;
  loginView.hidden = true;
  buildingsView.hidden = false;
});

loginForm.addEventListener('input', () => {
  loginError.hidden = true;
});

logoutButton.addEventListener('click', () => {
  loginForm.reset();
  buildingsView.hidden = true;
  loginView.hidden = false;
});

detailLogoutButton.addEventListener('click', () => {
  loginForm.reset();
  taskDetailsView.hidden = true;
  loginView.hidden = false;
});

buildingOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const tasks = option.nextElementSibling;
    const isOpen = option.getAttribute('aria-expanded') === 'true';
    option.setAttribute('aria-expanded', String(!isOpen));
    tasks.hidden = isOpen;
  });
});

taskOptions.forEach((task) => {
  task.addEventListener('click', () => {
    const row = task.closest('.task-row');
    taskTitle.textContent = row.querySelector('strong').textContent;
    taskStatus.textContent = row.querySelector('small').textContent;
    buildingsView.hidden = true;
    taskDetailsView.hidden = false;
  });
});

returnButton.addEventListener('click', () => {
  taskDetailsView.hidden = true;
  buildingsView.hidden = false;
});
