const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const responseMessage = document.querySelector('#response-message');
const loadingMessage = document.querySelector('#loading-message');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    responseMessage.innerHTML = '';
    loadingMessage.innerHTML = 'Loading...';

    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => { 
            loadingMessage.innerHTML = '';

            if (data.error) {
                responseMessage.innerHTML = data.error;
            } else {
                responseMessage.innerHTML = data.location + '<br><br>' + data.forecast;
            }
        });
    });
})