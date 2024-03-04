//IFFE



(function(){

    let regExpPatterns = {
        fullNamePattern : /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
        contactNumberPattern : /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
        emailAddressPattern : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/
    }

    function TestPattern(regExpression, testString){
        console.log(regExpression.test(testString) + Date.now());
    }

    function DisplayHomePage(){
        console.log("HOME PAGE");

        $("#aboutUsBtn").on("click", () =>{
            location.href = "about.html";
        })


        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">
                            This is my article paragraph</p></article>`);

    }

    /**
     * Add a contact to localStorage
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let newContact = new core.Contact(fullName, contactNumber, emailAddress);
        if(newContact.serialize()){
            console.log(newContact.FullName);
            let key = newContact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, newContact.serialize());
            console.log(`local storage: ${localStorage.getItem(key)} | contact serialize: ${newContact.serialize()}`);
        }
    }

    function DisplayAboutUsPage(){
        console.log("ABOUT US PAGE");
    }

    function DisplayContactPage(){
        console.log("CONTACT PAGE");
        let fullName = document.querySelector("#full-name");
        let contactNumber = document.querySelector("#contact-number");
        let emailAddress = document.querySelector("#email-address");
        let errorMessages = document.querySelector("#error-message");

        let sendButton = document.getElementById("send-button");
        let subscribeCheckbox = document.getElementById("subscribe-checkbox");

        sendButton.addEventListener("click", function(){
            if(subscribeCheckbox.checked){
                event.preventDefault();
                AddContact(fullName.value, contactNumber.value, emailAddress.value)
            }
        })

        ValidateContactPage(errorMessages);
    }

    function ValidateContactPage(errorMessages){
            ValidateElementInput("full-name", regExpPatterns.fullNamePattern, errorMessages,
                "Invalid Name");
            ValidateElementInput("email-address", regExpPatterns.emailAddressPattern, errorMessages,
                "Invalid Email");
            ValidateElementInput("contact-number", regExpPatterns.contactNumberPattern, errorMessages,
                "Invalid Contact Number");
    }

    /**
     *
     * @param {string} elementId
     * @param {RegExp} expression
     * @param {Element} errorElement
     * @param {string} errorMessage
     * @returns {boolean} isValid
     * @constructor
     */
    function ValidateElementInput(elementId, expression, errorElement = null, errorMessage = null){
        let inputElement = document.querySelector(`#${elementId}`)
        let result = false;

        inputElement.addEventListener("blur", function(){
            if (!expression.test(inputElement.value)){
                if(errorElement != null){
                    AddErrorToPage(errorElement, errorMessage)
                }
                result = false;
            } else{
                result = true;
            }

            if (errorElement != null){
                result ? RemoveErrorFromPage(errorElement, errorMessage) : AddErrorToPage(errorElement, errorMessage)
            }
            return result;
        })
    }

    function AddErrorToPage(messageElement, errorMessage){
        console.log(errorMessage)
        errorMessage = `- ${errorMessage}\n`
        console.log(errorMessage)
        messageElement.removeAttribute("hidden");
        messageElement.setAttribute("class", "col-lg-12 col-md-10 alert alert-danger")
        if(!messageElement.innerText.includes(errorMessage)){
            messageElement.innerText += errorMessage;
        }
    }

    function RemoveErrorFromPage(messageElement, errorMessage){
        errorMessage = `- ${errorMessage}\n`
        if(messageElement.innerText.includes(errorMessage)){
            messageElement.innerText = (messageElement.innerText.replaceAll (errorMessage, ""))
        }
        if(messageElement.innerText == ""){
            messageElement.hidden = true;
        }
    }



    function DisplayContactListPage() {
        console.log("CONTACT LIST PAGE");
        if (localStorage.length > 0) {
            let contactList = document.querySelector("#contact-list");

            let data = "";
            let keys = Object.keys(localStorage);

            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();

                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.FullName}</td>
                        <td>${contact.ContactNumber}</td>
                        <td>${contact.EmailAddress}</td>
                        
                        <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"> edit</i>
                            </button>
                        </td>
                        <td class="text-center">
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-edit fa-sm"> delete</i>
                            </button>
                        </td>
                        </tr>`;
                index++;
                contactList.innerHTML = data;
                $("button.edit").on("click", function(){
                    location.href = `edit.html#${$(this).val()}`
                })

                $("button.delete").on("click", function (){

                    if(confirm(`Are you sure you want to delete ${localStorage.getItem($(this).val()).split(",")[0]}?`)){
                        localStorage.removeItem($(this).val());
                        location.href = "contact-list.html";
                    }
                })

            }
            //console.log($("button.delete"));
        }
        $("#add-button").on("click", () =>{
            location.href = "edit.html#add"
        })
    }

    function DisplayProductsPage(){
        console.log("PRODUCTS PAGE");
    }

    function DisplayServicesPage(){
        console.log("SERVICES PAGE");
    }

    function DisplayEditPage(){
        console.log("EDIT PAGE");
        let fullName = document.querySelector("#full-name");
        let contactNumber = document.querySelector("#contact-number");
        let emailAddress = document.querySelector("#email-address");
        let page = location.hash.substring(1);

        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#edit-button").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);

                $("#edit-button").on("click", () =>{
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);

                    location.href = "contact-list.html";
                })
                $("#cancel-button").on("click", () =>{
                    location.href = "contact-list.html";
                })
                break;
            default:{
                let editContact = new core.Contact()
                console.log(page);
                editContact.deserialize(localStorage.getItem(page))

                $("#full-name").val(editContact.FullName);
                $("#contact-number").val(editContact.ContactNumber);
                $("#email-address").val(editContact.EmailAddress);

                $("#edit-button").on("click", function(){
                    event.preventDefault();
                    if(confirm(`Are you sure you want to make these changes to ${editContact.FullName} ?`)) {
                        editContact.FullName = $("#full-name").val();
                        editContact.EmailAddress = $("#email-address").val();
                        editContact.ContactNumber = $("#contact-number").val();

                        localStorage.setItem(page, editContact.serialize())
                        location.href = "contact-list.html";
                    }
                })
                $("#cancel-button").on("click", function (){
                    location.href = "contact-list.html"
                })
            }
            break;
        }
    }

    function DisplayRegisterPage() {
        console.log("REGISTER PAGE");
    }

    function DisplayLoginPage() {
        console.log("LOGIN PAGE");
        let successFlag = false;
        let usernameInput = document.querySelector("#username");
        let passwordInput = document.querySelector("#password");
        let loginButton = document.querySelector("#login-button");

        loginButton.addEventListener("click", function AttemptLogin(){

            AjaxRequest("GET", "./data/user.json", function GetUserData(userData){
                for (const user of JSON.parse(userData).users){
                    if (user.Username === usernameInput.value && user.Password === passwordInput.value){

                        let foundUser = new core.User();
                        foundUser.fromJSON(user)
                        sessionStorage.setItem("user", foundUser)
                        successFlag = true;
                        break;
                    }
                }
                if(successFlag) {
                    RemoveErrorFromPage(document.querySelector("#error-message"),"Failed to Login")
                } else{
                    AddErrorToPage(document.querySelector("#error-message"), "Failed to Login");
                }
            })
        })

    }

    /**
     *
     * @param method method of request sent to server
     * @param url URL of the target data
     * @param callback
     * @constructor
     */
    function AjaxRequest(method, url, callback){
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState == 2 || xhr.readyState == 3){

                console.log(`Communicating with ${url} at ${Date.now()}: READY STATE-${xhr.readyState} | ${xhr.status}`);
            }
            if (xhr.readyState == 4 && xhr.status == 200 && typeof callback === "function" && callback.length === 1){
                callback(xhr.responseText);
            }
        })
        xhr.open(method, url);
        xhr.send();
    }
    function LoadHeader(htmlData){
        document.querySelector("header").innerHTML = htmlData;
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
    }

    function CheckLogin(){
        if(sessionStorage.getItem("user") != null){
            document.querySelector("#login>a").innerText =" Logout"
            document.querySelector("#login").addEventListener("click", function LogoutFunctionality(){
                sessionStorage.clear();
                location.href = "login.html"
            })
        }
    }


    function ActiveLinkCallback(activeLink){
        switch(activeLink){
            case "home" : return DisplayHomePage;
            case "about" : return DisplayHomePage;
            case "services" : return DisplayServicesPage;
            case "contact" : return DisplayEditPage;
            case "contact-list" : return DisplayContactListPage;
            case "products" : return DisplayProductsPage;
            case "register" : return DisplayRegisterPage;
            case "login" : return DisplayRegisterPage;
            case "edit" : return DisplayEditPage;
            //case "404" : return Display404Page;
            default:
                console.log(`Callback for ${activeLink} does not exist`);
                break;
        }
    }

    function Start(){
        console.log("App Started");
        AjaxRequest("GET", "./views/components/header.html", LoadHeader);
        // let xhr = new XMLHttpRequest()
        // xhr.open("GET", "./header.html");
        // xhr.send();
        // xhr.addEventListener("readystatechange", function (){
        //     if (xhr.readyState == 2 || xhr.readyState == 3){
        //
        //         console.log(`At ${Date.now()}: READY STATE-${xhr.readyState} | ${xhr.status}`);
        //     }
        //     if (xhr.readyState == 4 && xhr.status == 200){
        //         document.querySelector("header")
        //             .innerHTML=(xhr.responseText);
        //         $(`li>a:contains(${document.title})`).addClass("active");
        //     }
        // })

        // switch(document.title){
        //     case "Home":
        //         DisplayHomePage();
        //         break
        //     case "About Us":
        //         DisplayAboutUsPage();
        //         break;
        //     case "Contact":
        //         DisplayContactPage();
        //         break;
        //     case "Contact List":
        //         DisplayContactListPage();
        //         break;
        //     case "Products":
        //         DisplayProductsPage();
        //         break;
        //     case "Services":
        //         DisplayServicesPage();
        //         break;
        //     case "Edit":
        //         DisplayEditPage();
        //         break;
        //     case "Register":
        //         DisplayRegisterPage();
        //         break;
        //     case "Login":
        //         DisplayLoginPage();
        //         break;


        //}
    }

    window.addEventListener("load", Start)
})();