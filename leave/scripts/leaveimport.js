/* Minification failed. Returning unminified contents.
(3,3-4): run-time error JS1195: Expected expression: )
(3,6-7): run-time error JS1195: Expected expression: >
(6,17-18): run-time error JS1195: Expected expression: )
(6,20-21): run-time error JS1195: Expected expression: >
(53,5-6): run-time error JS1002: Syntax error: }
(80,52-53): run-time error JS1014: Invalid character: `
(80,53-54): run-time error JS1195: Expected expression: .
(80,105-106): run-time error JS1195: Expected expression: &
(80,123-124): run-time error JS1195: Expected expression: &
(80,143-144): run-time error JS1014: Invalid character: `
(111,5-6): run-time error JS1002: Syntax error: }
(118,43-44): run-time error JS1014: Invalid character: `
(118,44-45): run-time error JS1195: Expected expression: .
(118,78-79): run-time error JS1014: Invalid character: `
(118,79-80): run-time error JS1004: Expected ';': )
(121,45-46): run-time error JS1014: Invalid character: `
(121,66-67): run-time error JS1014: Invalid character: `
(135,51-52): run-time error JS1195: Expected expression: >
(141,22-23): run-time error JS1195: Expected expression: )
(153,37-38): run-time error JS1195: Expected expression: >
(153,54-55): run-time error JS1004: Expected ';': )
(155,21-22): run-time error JS1197: Too many errors. The file might not be a JavaScript file: {
(81,29-35): run-time error JS1018: 'return' statement outside of function: return
(14,17-23): run-time error JS1018: 'return' statement outside of function: return
 */
// TODO: AI - make this a proper class. Keep all funcitonality including events to call "Check", which should eventually call "Init".

(() => {
    
    // Utility to initialise the form
    let Init = () =>
    {
        let form = document.querySelector('.default-form.import-form');
        if (form)
        {
            // If the form is already attached, do nothing
            if (form.classList.contains('attached'))
            {
                return;
            }

            // Clear any existing messages
            ClearMessage();

            // Add the attached class to the form
            form.classList.add('attached');

            // Get the button and file input
            let button = form.querySelector('button.submit-button');
            let file = form.querySelector('input[type="file"]');
            if (button && file)
            {
                // Always disable button initially - if content was refreshed, file input appears to have
                // a file but actually doesn't in the files collection
                button.setAttribute('disabled', 'disabled');
                
                // Clear the file input to avoid confusion
                try
                {
                    file.value = '';
                }
                catch (e)
                {
                    // Some browsers don't allow setting value on file inputs
                }
                
                // Reattach event listeners
                button.removeEventListener('click', Submit);
                button.addEventListener('click', Submit);
                file.removeEventListener('change', UploadFile);
                file.addEventListener('change', UploadFile);
            }
            else
            {
                SetMessage('Sorry, we could not find the form controls. Please refresh the page or contact support.');
            }
        }
    };

    // Utility to submit the form
    let Submit = () => 
    {
        ClearMessage();

        let errors = [];
        let form = document.querySelector('.default-form.import-form.attached');
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
            SetMessage(errors.join('<br />'));
        }
    }

    // Utility to upload the file
    let UploadFile = (event) => 
    {
        ClearMessage();
        
        let form = document.querySelector(`.default-form.import-form.attached`);
        if (form)
        {
            let button = form.querySelector(`button.submit-button`);
            let file = form.querySelector('input[type="file"]');
            if (form && button && file)
            {
                if (file.files.length > 0)
                {
                    button.setAttribute('disabled', 'disabled');

                    let formData = new FormData();
                    formData.append("files", file.files[0]);

                    let headers = new Headers();
                    let tokenHeaderName = "__RequestVerificationToken";
                    let tokenAlreadySet = false;
                    headers.forEach((value, key) =>
                    {
                        if (key.toLowerCase() === tokenHeaderName.toLowerCase())
                        {
                            tokenAlreadySet = true;
                        }
                    });
                    if (!tokenAlreadySet && window.AntiForgeryToken)
                    {
                        headers.append(tokenHeaderName, window.AntiForgeryToken);
                    }

                    fetch("/Import/FileUpload",
                    {
                        method: "POST",
                        body: formData,
                        headers: headers
                    })
                    .then(response => response.json())
                    .then(data =>
                    {
                        if (data.success)
                        {
                            button.removeAttribute("disabled");
                        } 
                        else
                        {
                            button.setAttribute("disabled", "disabled");
                            SetMessage(data.error || "File upload failed. Please try again.");
                        }
                    })
                    .catch(() =>
                    {
                        button.setAttribute("disabled", "disabled");
                        SetMessage("File upload failed. Please try again.");
                    });
                }
                else
                {
                    button.setAttribute("disabled", "disabled");
                    SetMessage("Please select a file to upload.");
                }
            }
            else
            {
                SetMessage("Cannot find form elements.");
            }
        }
        else
        {
            SetMessage("Cannot find form.");
        }
    };

    // Utility to set warning message
    function SetMessage(msg)
    {
        var warn = document.querySelector('p.warnings');
        if (warn)
        {
            warn.textContent = msg;
            warn.classList.remove('hidden');
        }
    }
    // Utility to clear warning message
    function ClearMessage()
    {
        var warn = document.querySelector('p.warnings');
        if (warn)
        {
            warn.textContent = '';
            warn.classList.add('hidden');
        }
    }

    // Utility to check for the form and initialise if found
    let CheckForForm = () => 
    {
        let form = document.querySelector('.default-form.import-form');
        if (form)
        {
            if (!form.classList.contains('attached'))
            {
                Initialised = false;
            }
            Init();
        }
        setTimeout(CheckForForm, 500);
    };

    // Wait for the form to be ready
    CheckForForm();

})();;
