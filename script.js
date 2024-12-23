document.addEventListener("DOMContentLoaded", function() {
    const nameInputContainer = document.querySelector('.name-input-container');
    const nameInput = document.getElementById('nameInput');
    const charLimitDisplay = document.querySelector('.char-limit');
    const errorMessage = document.querySelector('.error-message');
    const submitNameButton = document.getElementById('submitName');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const icons = document.querySelectorAll('.icon i');
    const sections = document.querySelectorAll('.content-section');

    const popularNames = [
        "Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin", "Lucas",
        "Henry", "Alexander", "Mason", "Michael", "Ethan", "Daniel", "Jacob", "Logan",
        "Jackson", "Levi", "Sebastian", "Mateo"
    ];

    function updateCharLimit() {
        const remaining = 15 - nameInput.value.length;
        charLimitDisplay.textContent = `Character limit: ${remaining}`;
    }

    function showMainContent(name) {
        nameInputContainer.style.display = 'none';
        sidebar.style.display = 'flex';
        mainContent.style.display = 'block';
        document.querySelector('.home-content h1').innerText = `Welcome, ${name}!`;
        document.querySelector('.home-content p').classList.remove('hidden');
        setTimeout(() => {
            icons.forEach(icon => {
                icon.style.display = 'block';
                icon.parentElement.classList.remove('skeleton');
            });
        }, 1000); // Match the duration of the slideIn animation
    }

    function validateNameInput() {
        const name = nameInput.value.trim();
        const isValid = /^[a-zA-Z]*$/.test(name);
        if (!isValid) {
            errorMessage.style.display = 'block';
            nameInput.classList.add('invalid');
        } else {
            errorMessage.style.display = 'none';
            nameInput.classList.remove('invalid');
        }
        return isValid;
    }

    submitNameButton.addEventListener('click', () => {
        if (validateNameInput()) {
            const name = nameInput.value.trim();
            if (name) {
                showMainContent(name);
                document.getElementById('content1').classList.add('active');
            }
        }
    });

    nameInput.addEventListener('input', () => {
        updateCharLimit();
        validateNameInput();
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && validateNameInput()) {
            const name = nameInput.value.trim();
            if (name) {
                showMainContent(name);
                document.getElementById('content1').classList.add('active');
            }
        }
    });

    document.addEventListener('keypress', (e) => {
        if (e.key === '/') {
            e.preventDefault();
            nameInput.focus();
        }
    });

    document.querySelectorAll('.icon').forEach((icon, index) => {
        icon.addEventListener('click', () => {
            sections.forEach(section => section.classList.remove('active'));
            sections.forEach(section => section.style.display = 'none');
            const selectedSection = document.getElementById(`content${index + 1}`);
            selectedSection.classList.add('active');
            selectedSection.style.display = 'block';
            selectedSection.querySelectorAll('.skeleton-text').forEach(skeleton => {
                skeleton.classList.remove('hidden');
            });
            selectedSection.querySelectorAll('p').forEach(element => {
                element.classList.add('hidden');
            });
            setTimeout(() => {
                selectedSection.querySelectorAll('.skeleton-text').forEach(skeleton => {
                    skeleton.classList.add('hidden');
                });
                selectedSection.querySelectorAll('p').forEach(element => {
                    element.classList.remove('hidden');
                });
            }, 1000); // Duration for skeleton loading effect
        });
    });

    // Ensure the website is not scrollable
    document.body.style.overflow = 'hidden';

    // Initialize character limit display
    updateCharLimit();
});
