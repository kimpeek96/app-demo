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
const startTaskButton = document.querySelector('.start-task-button');
const beforePhoto = document.querySelector('.before-photo');
const beforePhotoInput = document.querySelector('#before-photo-input');
const photoPreview = document.querySelector('.photo-preview');
const inProgressView = document.querySelector('.in-progress-view');
const progressTaskName = document.querySelector('.progress-task-name');
const progressBuilding = document.querySelector('.progress-building');
const progressDate = document.querySelector('.progress-date');
const notesButton = document.querySelector('.notes-button');
const notesInput = document.querySelector('.notes-input');
const progressLogoutButton = inProgressView.querySelector('.logout-button');
const finishTaskButton = document.querySelector('.finish-task-button');
const afterPhotoView = document.querySelector('.after-photo-view');
const afterPhotoInput = document.querySelector('#after-photo-input');
const afterPhotoPreview = document.querySelector('.after-photo-preview');
const completeTaskButton = document.querySelector('.complete-task-button');
const afterPhotoLogoutButton = afterPhotoView.querySelector('.logout-button');
const completedView = document.querySelector('.completed-view');
const summaryBuilding = document.querySelector('.summary-building');
const summaryTask = document.querySelector('.summary-task');
const summaryStart = document.querySelector('.summary-start');
const summaryEnd = document.querySelector('.summary-end');
const summaryDuration = document.querySelector('.summary-duration');
const summaryNotes = document.querySelector('.summary-notes');
const summaryBeforePhoto = document.querySelector('.summary-before-photo');
const summaryAfterPhoto = document.querySelector('.summary-after-photo');
const closeSummaryButton = document.querySelector('.close-summary-button');
const completedLogoutButton = completedView.querySelector('.logout-button');
let selectedBuildingName = '';
let taskStartedAt;
let selectedTaskRow;

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

progressLogoutButton.addEventListener('click', () => {
  loginForm.reset();
  inProgressView.hidden = true;
  loginView.hidden = false;
});

afterPhotoLogoutButton.addEventListener('click', () => {
  loginForm.reset();
  afterPhotoView.hidden = true;
  loginView.hidden = false;
});

completedLogoutButton.addEventListener('click', () => {
  loginForm.reset();
  completedView.hidden = true;
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
    selectedTaskRow = row;
    taskTitle.textContent = row.querySelector('strong').textContent;
    taskStatus.textContent = row.querySelector('small').textContent;
    selectedBuildingName = task.closest('.building-card').querySelector('.building-option strong').textContent;
    beforePhoto.hidden = true;
    photoPreview.hidden = true;
    beforePhotoInput.value = '';
    buildingsView.hidden = true;
    taskDetailsView.hidden = false;
  });
});

returnButton.addEventListener('click', () => {
  taskDetailsView.hidden = true;
  buildingsView.hidden = false;
});

startTaskButton.addEventListener('click', () => {
  beforePhoto.hidden = false;
  beforePhotoInput.click();
});

beforePhotoInput.addEventListener('change', () => {
  const [photo] = beforePhotoInput.files;
  if (!photo) return;

  photoPreview.src = URL.createObjectURL(photo);
  photoPreview.hidden = false;
  progressTaskName.textContent = taskTitle.textContent;
  progressBuilding.textContent = selectedBuildingName;
  taskStartedAt = new Date();
  const selectedStatus = selectedTaskRow.querySelector('small');
  selectedStatus.textContent = 'W realizacji';
  selectedStatus.className = 'status-progress';
  selectedTaskRow.querySelector('.choose-task').remove();
  progressDate.textContent = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium', timeStyle: 'short' }).format(taskStartedAt);
  taskDetailsView.hidden = true;
  inProgressView.hidden = false;
});

notesButton.addEventListener('click', () => {
  notesInput.hidden = false;
  notesInput.focus();
});

finishTaskButton.addEventListener('click', () => {
  afterPhotoPreview.hidden = true;
  afterPhotoInput.value = '';
  completeTaskButton.disabled = true;
  inProgressView.hidden = true;
  afterPhotoView.hidden = false;
  afterPhotoInput.click();
});

afterPhotoInput.addEventListener('change', () => {
  const [photo] = afterPhotoInput.files;
  if (!photo) return;

  afterPhotoPreview.src = URL.createObjectURL(photo);
  afterPhotoPreview.hidden = false;
  completeTaskButton.disabled = false;
});

completeTaskButton.addEventListener('click', () => {
  const endedAt = new Date();
  const formatter = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium', timeStyle: 'short' });
  const elapsedMinutes = Math.max(1, Math.round((endedAt - taskStartedAt) / 60000));
  summaryBuilding.textContent = selectedBuildingName;
  summaryTask.textContent = taskTitle.textContent;
  summaryStart.textContent = formatter.format(taskStartedAt);
  summaryEnd.textContent = formatter.format(endedAt);
  summaryDuration.textContent = `${elapsedMinutes} min`;
  summaryNotes.textContent = notesInput.value.trim() || 'Brak uwag.';
  summaryBeforePhoto.src = photoPreview.src;
  summaryAfterPhoto.src = afterPhotoPreview.src;
  const selectedStatus = selectedTaskRow.querySelector('small');
  selectedStatus.textContent = 'Zakończono';
  selectedStatus.className = 'status-done';
  afterPhotoView.hidden = true;
  completedView.hidden = false;
});

closeSummaryButton.addEventListener('click', () => {
  completedView.hidden = true;
  buildingsView.hidden = false;
});
