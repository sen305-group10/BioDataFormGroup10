const form = document.getElementById('bioDataForm');
const previewCard = document.getElementById('previewCard');
const previewContent = document.getElementById('previewContent');

// Helper to set error messages
function setError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(errorId);
  input.classList.add('invalid');
  errorElement.textContent = message;
}

// Helper to clear error messages
function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(errorId);
  input.classList.remove('invalid');
  errorElement.textContent = '';
}

// Form submit event handler
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Stop default page refresh

  let isValid = true;

  // 1. Validate Full Name
  const fullName = document.getElementById('fullName').value.trim();
  if (fullName === '') {
    setError('fullName', 'nameError', 'Please enter your full name.');
    isValid = false;
  } else {
    clearError('fullName', 'nameError');
  }

  // 2. Validate Matric Number
  const matricNo = document.getElementById('matricNo').value.trim();
  if (matricNo === '') {
    setError('matricNo', 'matricError', 'Please enter your matric number.');
    isValid = false;
  } else {
    clearError('matricNo', 'matricError');
  }

  // 3. Validate Email
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError('email', 'emailError', 'Please provide a valid email address.');
    isValid = false;
  } else {
    clearError('email', 'emailError');
  }

  // 4. Validate Phone
  const phone = document.getElementById('phone').value.trim();
  if (phone.length < 10) {
    setError('phone', 'phoneError', 'Please enter a valid phone number (at least 10 digits).');
    isValid = false;
  } else {
    clearError('phone', 'phoneError');
  }

  // 5. Validate Gender
  const gender = document.getElementById('gender').value;
  if (gender === '') {
    setError('gender', 'genderError', 'Please choose a gender.');
    isValid = false;
  } else {
    clearError('gender', 'genderError');
  }

  // 6. Validate Date of Birth
  const dob = document.getElementById('dob').value;
  if (dob === '') {
    setError('dob', 'dobError', 'Please select your date of birth.');
    isValid = false;
  } else {
    clearError('dob', 'dobError');
  }

  // 7. Validate Department
  const department = document.getElementById('department').value;
  if (department === '') {
    setError('department', 'deptError', 'Please select your department.');
    isValid = false;
  } else {
    clearError('department', 'deptError');
  }

  // 8. Validate Level
  const level = document.getElementById('level').value;
  if (level === '') {
    setError('level', 'levelError', 'Please select your current level.');
    isValid = false;
  } else {
    clearError('level', 'levelError');
  }

  // If all fields pass validation, display summary card
  if (isValid) {
    const state = document.getElementById('state').value.trim() || 'Not specified';

    previewContent.innerHTML = `
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Matric No:</strong> ${matricNo}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Date of Birth:</strong> ${dob}</p>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>Level:</strong> ${level} Level</p>
      <p><strong>State of Origin:</strong> ${state}</p>
    `;

    previewCard.classList.remove('hidden');
    previewCard.scrollIntoView({ behavior: 'smooth' });
  }
});

// Reset form event handler
form.addEventListener('reset', function () {
  previewCard.classList.add('hidden');
  previewContent.innerHTML = '';
  const errorElements = document.querySelectorAll('.error-msg');
  errorElements.forEach((el) => (el.textContent = ''));
  const invalidInputs = document.querySelectorAll('.invalid');
  invalidInputs.forEach((input) => input.classList.remove('invalid'));
});
