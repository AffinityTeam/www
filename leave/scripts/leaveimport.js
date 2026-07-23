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

            // Initialize MFA buttons if present
            InitMFAButtons(form);

            // Get the button and file input for main import functionality
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
            else if (!form.querySelector('.mfa-send-code') && !form.querySelector('.mfa-verify-code'))
            {
                // Only show error if this is not an MFA step
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

    // Initialize MFA button event listeners
    let InitMFAButtons = (form) =>
    {
        // Send verification code button
        let sendCodeBtn = form.querySelector('.mfa-send-code');
        if (sendCodeBtn)
        {
            sendCodeBtn.removeEventListener('click', SendVerificationCode);
            sendCodeBtn.addEventListener('click', SendVerificationCode);
        }

        // Verify code button
        let verifyCodeBtn = form.querySelector('.mfa-verify-code');
        if (verifyCodeBtn)
        {
            verifyCodeBtn.removeEventListener('click', VerifyCode);
            verifyCodeBtn.addEventListener('click', VerifyCode);
        }

        // Start over button
        let startOverBtn = form.querySelector('.mfa-start-over');
        if (startOverBtn)
        {
            startOverBtn.removeEventListener('click', StartOver);
            startOverBtn.addEventListener('click', StartOver);
        }
    };

    // Send verification code to email
    let SendVerificationCode = () =>
    {
        ClearMessage();
        let emailInput = document.getElementById('verificationEmail');
        if (!emailInput || !emailInput.value)
        {
            SetMessage('Please enter your email address');
            return;
        }

        // Make POST request using fetch API
        let formData = new FormData();
        formData.append('email', emailInput.value);

        fetch('/Import/SendVerificationCode', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success)
            {
                // Reload page to show next step
                window.location.reload();
            }
            else
            {
                SetMessage(data.error || 'Failed to send verification code');
            }
        })
        .catch(() => {
            SetMessage('Failed to send verification code. Please try again.');
        });
    };

    // Verify the entered code
    let VerifyCode = () =>
    {
        ClearMessage();
        let codeInput = document.getElementById('verificationCode');
        if (!codeInput || !codeInput.value)
        {
            SetMessage('Please enter the verification code');
            return;
        }

        // Make POST request using fetch API
        let formData = new FormData();
        formData.append('code', codeInput.value);

        fetch('/Import/VerifyCode', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success)
            {
                // Reload page to show import form
                window.location.reload();
            }
            else
            {
                SetMessage(data.error || 'Invalid verification code');
            }
        })
        .catch(() => {
            SetMessage('Failed to verify code. Please try again.');
        });
    };

    // Start over with new email
    let StartOver = () =>
    {
        if (confirm('Start over with a new email address?'))
        {
            fetch('/Import/StartOver', {
                method: 'POST'
            })
            .then(() => {
                window.location = '/Import';
            })
            .catch(() => {
                // Even if request fails, redirect to start over
                window.location = '/Import';
            });
        }
    };

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

})();
