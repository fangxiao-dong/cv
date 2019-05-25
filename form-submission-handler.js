'use strict';

(function() {
    function disableSubmitButton(form) {
        let button = form.querySelector('button.submit');
        button.setAttribute('disabled', 'true');
    }

    function validEmail(email) {
        let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6})$/i;
        return re.test(email);
    }

    function getFormData(form) {

    }

    function handleFormSubmit(event) {
        event.preventDefault();

        let form = event.target;
        let data = getFormData(form);

        if (data.email && !validEmail(data.email)) {
            let invalidEmail = form.querySelector('.email-invalid');

            if (invalidEmail) {
                invalidEmail.style.display = 'block';
                return false;
            }
        }
        else {
            disableSubmitButton(form);
            const url = form.action;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE) {
                    console.log(xhr.status, xhr.statusText);
                    console.log(xhr.responseText);

                    form.reset();
                    let formElements = form.querySelector('.form-elements');
                    if (formElements) {
                        formElements.style.display = 'none';
                    }
                    let thankYouMessage = form.querySelector('.thankyou_message');
                    if (thankYouMessage) {
                        thankYouMessage.style.display = 'block';
                    }
                }         
            }

            let encoded = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
            xhr.send(encoded);
        }
    }

    function loaded() {
        document.querySelector('form.gform').addEventListener('submit', handleFormSubmit, false);
    }

    document.addEventListener('DOMContentLoaded', loaded, false);
})();