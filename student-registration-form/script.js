const form = document.getElementById('studentForm');
const summary = document.getElementById('summary');
const table = document.getElementById('summaryTable');
const photo = document.getElementById('photo');
const photoBox = document.getElementById('photoBox');

photo.addEventListener('change', () => {
  const file = photo.files[0];
  if (!file) { photoBox.style.backgroundImage = ''; photoBox.textContent = 'No photo'; return; }
  photoBox.textContent = '';
  photoBox.style.backgroundImage = 'url(' + URL.createObjectURL(file) + ')';
});

form.addEventListener('reset', () => {
  photoBox.style.backgroundImage = '';
  photoBox.textContent = 'No photo';
  form.querySelectorAll('.msg').forEach(m => m.textContent = '');
  form.querySelectorAll('.invalid').forEach(i => i.classList.remove('invalid'));
});

function setError(field, text) {
  const msg = field.parentElement.querySelector('.msg');
  if (msg) msg.textContent = text;
  field.classList.toggle('invalid', !!text);
}

function validate() {
  let ok = true;
  let firstBad = null;
  const flag = (el, text) => {
    setError(el, text);
    if (text) { ok = false; firstBad = firstBad || el; }
  };

  form.querySelectorAll('input[required], select[required], textarea[required]').forEach(el => {
    flag(el, el.value.trim() ? '' : 'This field is required.');
  });

  const gender = form.querySelector('input[name="Gender"]:checked');
  document.querySelector('#genderWrap .msg').textContent = gender ? '' : 'Please choose one.';
  if (!gender) { ok = false; firstBad = firstBad || form.querySelector('input[name="Gender"]'); }

  ['email', 'gEmail'].forEach(id => {
    const el = document.getElementById(id);
    if (el.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) flag(el, 'Enter a valid email address.');
  });

  ['phone', 'gPhone'].forEach(id => {
    const el = document.getElementById(id);
    const digits = el.value.replace(/[\s+\-()]/g, '');
    if (el.value.trim() && !/^\d{10,14}$/.test(digits)) flag(el, 'Enter a valid phone number (10 to 14 digits).');
  });

  const dob = document.getElementById('dob');
  if (dob.value) {
    const d = new Date(dob.value), now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) age--;
    if (d > now) flag(dob, 'Date of birth cannot be in the future.');
    else if (age < 14) flag(dob, 'Student must be at least 14 years old.');
  }

  const jamb = document.getElementById('jamb');
  if (jamb.value !== '' && (Number(jamb.value) < 0 || Number(jamb.value) > 400)) flag(jamb, 'Score must be between 0 and 400.');

  const agree = document.getElementById('agree');
  document.getElementById('agreeMsg').textContent = agree.checked ? '' : 'You must agree before submitting.';
  if (!agree.checked) { ok = false; firstBad = firstBad || agree; }

  if (firstBad) firstBad.focus();
  return ok;
}

form.addEventListener('input', e => {
  if (e.target.classList.contains('invalid') && e.target.value.trim()) setError(e.target, '');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate()) return;

  const data = new FormData(form);
  const seen = new Set();
  table.innerHTML = '';
  for (const [key] of data.entries()) {
    if (seen.has(key)) continue;
    seen.add(key);
    const val = data.getAll(key).filter(v => typeof v === 'string' && v.trim()).join(', ');
    if (!val) continue;
    const tr = document.createElement('tr');
    const th = document.createElement('th'); th.textContent = key;
    const td = document.createElement('td'); td.textContent = val;
    tr.append(th, td);
    table.appendChild(tr);
  }

  form.style.display = 'none';
  summary.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('backBtn').addEventListener('click', () => {
  summary.style.display = 'none';
  form.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
