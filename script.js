const form = document.getElementById('bioForm');
const note = document.getElementById('note');
const overlay = document.getElementById('overlay');
const summary = document.getElementById('summary');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const boxes = form.querySelectorAll('.field input');
  const gender = form.querySelector('input[name="gender"]:checked');
  const level = form.querySelector('input[name="level"]:checked');

  // make sure nothing is empty
  for (const box of boxes) {
    if (box.value.trim() === '') {
      note.textContent = 'Please fill in every field.';
      return;
    }
  }
  if (!gender || !level) {
    note.textContent = 'Please choose your gender and level.';
    return;
  }

  note.textContent = '';

  // show what they entered
  summary.innerHTML = '';
  for (const box of boxes) {
    summary.innerHTML += '<div><dt>' + box.nextElementSibling.textContent + '</dt><dd>' + box.value + '</dd></div>';
  }
  summary.innerHTML += '<div><dt>Gender</dt><dd>' + gender.value + '</dd></div>';
  summary.innerHTML += '<div><dt>Level</dt><dd>' + level.value + '</dd></div>';

  overlay.classList.add('open');
});

// buttons
document.getElementById('backBtn').onclick = function () {
  overlay.classList.remove('open');
};

form.onreset = function () {
  note.textContent = '';
};