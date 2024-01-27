document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const messageContainer = document.getElementById('message');
        messageContainer.innerHTML = '';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const inputDate = document.getElementById('inputDate').value;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            messageContainer.innerHTML = 'go ff, u cant even write an email address';
            return;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(inputDate)) {
            messageContainer.innerHTML = 'go ff, u cant even write a date';
            return;
        }

        modifyContent(name, email, inputDate);
    });
});

function modifyContent(name, email, inputDate) {
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = `gg go next ${name} ${email} ${inputDate}`;
}
