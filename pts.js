// Dom Elements
const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const uppercaseEl = document.getElementById('include-uppercase');
const lowercaseEl = document.getElementById('include-lowercase');
const numbersEl = document.getElementById('include-numbers');
const symbolsEl = document.getElementById('include-symbols');
const generateBtn = document.getElementById('generate-btn');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// Synchronize range slider text label
lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Main generate functionality
function generatePassword() {
    let characterPool = '';
    
    if (uppercaseEl.checked) characterPool += uppercaseChars;
    if (lowercaseEl.checked) characterPool += lowercaseChars;
    if (numbersEl.checked) characterPool += numberChars;
    if (symbolsEl.checked) characterPool += symbolChars;

    // Validation: If no configurations are checked
    if (characterPool === '') {
        passwordDisplay.value = '';
        alert('Please select at least one character type!');
        return;
    }

    let generatedPassword = '';
    const passwordLength = parseInt(lengthSlider.value);

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        generatedPassword += characterPool[randomIndex];
    }

    passwordDisplay.value = generatedPassword;
}

// Copy to Clipboard feature
async function copyToClipboard() {
    const password = passwordDisplay.value;
    if (!password) return;

    try {
        await navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
    } catch (err) {
        alert('Failed to copy password.');
    }
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Auto-generate one on initial load
generatePassword();
