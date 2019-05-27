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
        let elements = form.elements;

        let fields = Object.keys(elements).map(key => {
            if(elements[key].name !== undefined) {
                return elements[key].name;
            }
            // special case for Edge's html collection
            else if (elements[key].length > 0) {
                return elements[key].item(0).name;
            }
        }).filter((item, pos, self) => {
            return self.indexOf(item) === pos && item;
        });

        var formData = {};

        fields.forEach(name => formData[name] = elements[name].value);

        formData.formDataNameOrder = JSON.stringify(fields);
        return formData;
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        let form = event.target;
        let data = getFormData(form);

        if (!data.name || !data.message || !data.email) {
            alert('Please complete the form before submitting.');
            return false;
        }
        else if (!validEmail(data.email)) {
            let invalidEmail = form.querySelector('.invalid-email');

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
                    console.log(xhr.status);
                    console.log(xhr.responseText);

                    form.reset();
                    let formElements = document.querySelector('.form-elements');
                    if (formElements) {
                        formElements.style.display = 'none';
                    }
                    let thankYouMessage = document.querySelector('.thankyou_message');
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