/* Minification failed. Returning unminified contents.
(3,3-4): run-time error JS1195: Expected expression: )
(3,6-7): run-time error JS1195: Expected expression: >
(9,17-18): run-time error JS1195: Expected expression: )
(9,20-21): run-time error JS1195: Expected expression: >
(36,5-6): run-time error JS1002: Syntax error: }
(62,52-53): run-time error JS1014: Invalid character: `
(62,53-54): run-time error JS1195: Expected expression: .
(62,105-106): run-time error JS1195: Expected expression: &
(62,123-124): run-time error JS1195: Expected expression: &
(62,143-144): run-time error JS1014: Invalid character: `
(93,5-6): run-time error JS1002: Syntax error: }
(99,43-44): run-time error JS1014: Invalid character: `
(99,44-45): run-time error JS1195: Expected expression: .
(99,69-70): run-time error JS1014: Invalid character: `
(99,70-71): run-time error JS1004: Expected ';': )
(102,45-46): run-time error JS1014: Invalid character: `
(102,66-67): run-time error JS1014: Invalid character: `
(116,51-52): run-time error JS1195: Expected expression: >
(120,22-23): run-time error JS1195: Expected expression: )
(130,37-38): run-time error JS1195: Expected expression: >
(130,54-55): run-time error JS1004: Expected ';': )
(131,35-36): run-time error JS1197: Too many errors. The file might not be a JavaScript file: {
(63,29-35): run-time error JS1018: 'return' statement outside of function: return
(11,26-38): run-time error JS1018: 'return' statement outside of function: return false
 */
// TODO: AI - make this a proper class. Keep all funcitonality including events to call "Check", which should eventually call "Init".

(() => {

    let Initialised = false;
    let WaitForFormMax = 100;
    let WaitForFormAttempts = 0;

    let Init = () =>
    {
        if (Initialised) return false;
        Initialised = true;

        clearMessage();

        let form = document.querySelector('.default-form.import-form');
        if (form)
        {
            let button = form.querySelector('button.submit-button');
            let file = form.querySelector('input[type="file"]');
            if (button && file)
            {
                button.setAttribute('disabled', 'disabled');
                button.addEventListener('click', Submit);
                file.addEventListener('change', UploadFile);
            }
            else
            {
                setMessage('Sorry, we could not find the form controls. Please refresh the page or contact support.');
            }
        }
        else
        {
            setMessage('Sorry, we could not find the import form. Please refresh the page or contact support.');
        }
    };

    let Submit = () => 
    {
        clearMessage();

        let errors = [];
        let form = document.querySelector('.default-form.import-form');
        if (form)
        {
            let button = form.querySelector('button.submit-button');
            let file = form.querySelector('input[type="file"]');
            if (button && file)
            {
                if (!button.hasAttribute('disabled'))
                {
                    let companyNumber = form.querySelector('input[name="companyNumber"]');
                    let type = form.querySelector('select[name="type"]');
                    let email = form.querySelector('input[name="email"]');
                    if (type && email && companyNumber)
                    {
                        let companyNumberValue = companyNumber.value;
                        let typeValue = type.value;
                        let emailValue = email.value;
                        if (companyNumberValue.trim() !== '' && typeValue !== '' && emailValue !== '')
                        {
                            window.location.href = `./Import/Process?companyNumber=${companyNumberValue}&type=${typeValue}&email=${emailValue}`;
                            return;
                        }
                        else
                        {
                            errors.push('Please fill in all required fields before submitting.');
                        }
                    }
                    else
                    {
                        errors.push('A required field(s) are missing from the form. Please refresh the page or contact support.');
                    }
                }
                else
                {
                    errors.push('Please upload a file before submitting the form.');
                }
            }
            else
            {
                errors.push('Sorry, we could not find the form controls. Please refresh the page or contact support.');
            }
        }
        else
        {
            errors.push('Sorry, we could not find the import form. Please refresh the page or contact support.');
        }
        if (errors.length > 0)
        {
            setMessage(errors.join('<br />'));
        }
    }

    let UploadFile = (event) => 
    {
        clearMessage();
        
        let form = document.querySelector(`.default-form.import-form`);
        if (form)
        {
            let button = form.querySelector(`button.submit-button`);
            let file = form.querySelector('input[type="file"]');
            if (form && button && file)
            {
                if (file.files.length > 0)
                {
                    let formData = new FormData();
                    formData.append("files", file.files[0]);

                    // Prepare headers and only add __RequestVerificationToken if not already present
                    let headers = new Headers();
                    // Check if global code already set the header (case-insensitive)
                    let tokenHeaderName = "__RequestVerificationToken";
                    let tokenAlreadySet = false;
                    headers.forEach((value, key) => {
                        if (key.toLowerCase() === tokenHeaderName.toLowerCase()) {
                            tokenAlreadySet = true;
                        }
                    });
                    if (!tokenAlreadySet && window.AntiForgeryToken) {
                        headers.append(tokenHeaderName, window.AntiForgeryToken);
                    }

                    fetch("/Import/FileUpload", {
                        method: "POST",
                        body: formData,
                        headers: headers
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            button.removeAttribute("disabled");
                        } else {
                            button.setAttribute("disabled", "disabled");
                            setMessage(data.error || "File upload failed. Please try again.");
                        }
                    })
                    .catch(() => {
                        button.setAttribute("disabled", "disabled");
                        setMessage("File upload failed. Please try again.");
                    });
                }
                else
                {
                    setMessage("Please select a file to upload.");
                }
            }
            else
            {
                setMessage("Cannot find form elements.");
            }
        }
        else
        {
            setMessage("Cannot find form.");
        }
    };

    let WaitForForm = () => 
    {
        if (Initialised) return;
        var duration = Math.round((WaitForFormAttempts * 500) / 1000);
        if (WaitForFormAttempts < WaitForFormMax)
        {
            let form = document.querySelector('.default-form.import-form');
            if (form)
            {
                console.log(`Found form node after ${WaitForFormAttempts} attemtps (${duration} seconds)`);
                Init();
                return;
            }
            else
            {
                WaitForFormAttempts++;
            }
        }
        else
        {
            setMessage('Unable to load the import form after several attempts. Please refresh the page or contact support.');
            return;
        }
        setTimeout(WaitForForm, 500);
    };

    // Utility to set warning message
    function setMessage(msg) {
        var warn = document.querySelector('p.warnings');
        if (warn) {
            warn.textContent = msg;
            warn.classList.remove('hidden');
        }
    }
    // Utility to clear warning message
    function clearMessage() {
        var warn = document.querySelector('p.warnings');
        if (warn) {
            warn.textContent = '';
            warn.classList.add('hidden');
        }
    }

    // Wait for the form to be ready
    WaitForForm();

})();;
