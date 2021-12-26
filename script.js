const urls = [
    {
        "id": "users-outlined",
        "url": "https://jsonplaceholder.typicode.com/users",
    },
    {        
        "id": "posts-outlined",
        "url": "https://jsonplaceholder.typicode.com/posts"
    },
    {
        "id": "albums-outlined",
        "url": "https://jsonplaceholder.typicode.com/albums"
    }   
]

const addModal = document.getElementById("add-new-api");
const modalAlert = document.getElementById("modal-alert");
const modalReturn = document.getElementById("modal-return");
const modalSave = document.getElementById("modal-save");
const modalAlertText = document.getElementById("modal-alert-text");
const urlTitle = document.getElementById("url-title");
const url = document.getElementById("url");
const codeResult = document.getElementById("result");
const errorAlert = document.getElementById("error-alert");
const dataLength = document.getElementById("data-length");

// create radio button
const createRadioButton = function() {
    const radioButtons = document.getElementById("radio-buttons");

    // create input
    const radioButtonInput = document.createElement("input");
    radioButtonInput.id = urlTitle.value.toLowerCase().replace(/\s+/g,  '') + "-outlined";
    radioButtonInput.setAttribute("type", "radio");
    radioButtonInput.setAttribute("name", "api-button");
    radioButtonInput.setAttribute("autocomplete", "off");
    radioButtonInput.classList.add("btn-check");

    //create label
    const radioButtonLabel = document.createElement("label");
    radioButtonLabel.setAttribute("for", urlTitle.value.toLowerCase().replace(/\s+/g,  '') + "-outlined");
    radioButtonLabel.classList.add("btn", "btn-outline-dark");
    radioButtonLabel.appendChild(document.createTextNode(urlTitle.value));

    radioButtons.appendChild(radioButtonInput);
    radioButtons.appendChild(radioButtonLabel);
}

// modal -> check API and data, create radio button
const addNewApi = async function() {
    try {   
        modalAlert.innerHTML = "";
        modalAlert.classList.remove('alert', 'alert-danger');

        const resp = await fetch(url.value);
        const data = await resp.json();
        
        modalAlertText.textContent = "API successfully added. " + "Title: " + urlTitle.value + ", " + "Url: " + url.value + ".";
        modalReturn.style.marginBottom = "1.5rem";
        modalReturn.hidden = false;
        modalAlert.textContent = "API successfully added.";
        modalAlert.classList.add('alert', 'alert-success');
        
        createRadioButton();
         
        const addUrl = {
            "id": urlTitle.value.toLowerCase().replace(/\s+/g,  '') + "-outlined",
            "url": url.value
        }
        urls.push(addUrl);

        urlTitle.value = "";
        url.value = "";
    } catch (err) {
        modalAlert.innerHTML = `Ops! Something is wrong. ${err}`;
        modalAlert.classList.add('alert', 'alert-danger');
    }
}

// save button
const saveButton = function() {
    if (urlTitle.value === "" || url.value === "") {
        modalAlert.innerHTML = "Please enter the data in the input fields!";
        modalAlert.classList.add('alert', 'alert-danger');
    } else {
        addNewApi();
    }
}

// close modal
const closeModal = function() {
    modalAlert.innerHTML = "";
    modalAlert.classList.remove('alert', 'alert-danger');
    urlTitle.value = "";
    url.value = "";
}

// close modal return
const closeModalReturn = function() {
    modalReturn.hidden = true;
}

// return data
const returnData = async function() {
    try {
        const selectedUrl = document.querySelector('input[name="api-button"]:checked').id;
        const selectedUrlData = urls.filter(urlObject => urlObject.id === selectedUrl);
        const resp = await fetch(selectedUrlData[0].url);
        const json = await resp.json();
        const data = JSON.stringify(json, null, "\t");
        dataLength.innerHTML = `Number of all records: ${json.length}.`;

        codeResult.innerHTML = data
            .replace(/\n/g, "<br />")
            .replace(/\\n/g, " ")
            .replace(/\t/g, "&nbsp;&nbsp;");
    } catch (err) {
        errorAlert.innerHTML = `Ops! Something is wrong with. ${err}`;
        errorAlert.classList.add("alert", "alert-danger");
    }
}

// get data
const getData = function() {
    if (!(document.querySelector('input[name="api-button"]:checked'))) {       
        errorAlert.innerHTML = "Please select API data to display.";
        errorAlert.hidden = false;
    } else {
        errorAlert.hidden = true;
        returnData();
    }
}

// reset data
const resetData = function() {
    codeResult.innerHTML = "";
    dataLength.innerHTML = "";
}