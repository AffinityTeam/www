/* Minification failed. Returning unminified contents.
(15,3-4): run-time error JS1195: Expected expression: )
(15,6-7): run-time error JS1195: Expected expression: >
(25,17-18): run-time error JS1195: Expected expression: )
(25,20-21): run-time error JS1195: Expected expression: >
(55,5-6): run-time error JS1002: Syntax error: }
(80,52-53): run-time error JS1014: Invalid character: `
(80,53-54): run-time error JS1195: Expected expression: .
(80,105-106): run-time error JS1195: Expected expression: &
(80,123-124): run-time error JS1195: Expected expression: &
(80,143-144): run-time error JS1014: Invalid character: `
(111,5-6): run-time error JS1002: Syntax error: }
(116,43-44): run-time error JS1014: Invalid character: `
(116,44-45): run-time error JS1195: Expected expression: .
(116,69-70): run-time error JS1014: Invalid character: `
(116,70-71): run-time error JS1004: Expected ';': )
(119,45-46): run-time error JS1014: Invalid character: `
(119,66-67): run-time error JS1014: Invalid character: `
(133,51-52): run-time error JS1195: Expected expression: >
(137,22-23): run-time error JS1195: Expected expression: )
(147,37-38): run-time error JS1195: Expected expression: >
(147,54-55): run-time error JS1004: Expected ';': )
(148,35-36): run-time error JS1197: Too many errors. The file might not be a JavaScript file: {
(81,29-35): run-time error JS1018: 'return' statement outside of function: return
(27,26-38): run-time error JS1018: 'return' statement outside of function: return false
 */
window.addEvent('loggedin', function () {
    //uialert({
    //    message: 'Loading Configuration',
    //    showLoader: true,
    //    noClose: false
    //});

    ////INITIALISE DATA CALLS
    //getConfigOptions(); //get options for new configs
    //getAllConfigs(); //get existing configs     
});

// TODO: AI - make this a proper class. Keep all funcitonality including events to call "Check", which should eventually call "Init".

(() => {
    let Checked = false;
    let Initialised = false;
    let UiReady = false;
    let DashboardReady = false;
    let LoggedIn = false;
    let UserComplete = false;
    let WaitForFormMax = 100;
    let WaitForFormAttempts = 0;

    let Init = () =>
    {
        if (Initialised) return false;
        Initialised = true;

        console.log('UiReady        : ', UiReady);
        console.log('DashboardReady : ', DashboardReady);
        console.log('LoggedIn       : ', LoggedIn);
        console.log('UserComplete   : ', UserComplete);

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

    let Check = () =>
    {
        if (Checked) return;
        if (UiReady && UserComplete)
        {
            console.log(`UiReady and UserComplete`);
            Checked = true;
            WaitForForm();
            return;
        }
        if (UiReady && LoggedIn)
        {
            console.log(`UiReady and LoggedIn`);
            Checked = true;
            WaitForForm();
            return;
        }
        if (UiReady && DashboardReady)
        {
            console.log(`UiReady and DashboardReady`);
            Checked = true;
            WaitForForm();
            return;
        }
        if (UiReady) // TODO: Not sure if this is enough on it's own to go wait for the form. Need to test.
        {
            console.log(`UiReady`);
            Checked = true;
            WaitForForm();
            return;
        }
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

    window.addEventListener('DashboardReady', () => { DashboardReady = true; Check(); });
    window.addEventListener('UiReady', () =>  { UiReady = true; Check(); });
    window.addEventListener('loggedin', () => { LoggedIn = true; Check(); });
    window.addEventListener('userComplete', () => { UserComplete = true; Check(); });

})();;
