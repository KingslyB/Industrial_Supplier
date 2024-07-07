//IFFE


(function(){

    let regExpPatterns = {
        fullNamePattern : /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
        contactNumberPattern : /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
        emailAddressPattern : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/
    }


    function DisplayHomePage(){
        console.log("HOME PAGE");

        $("#aboutUsBtn").on("click", () =>{
            location.href = "/about";
        })


        $("main.container").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
        $("main.container").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">
                            This is my article paragraph</p></article>`);

    }

    /**
     * Add a contact to localStorage
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName: string, contactNumber: string, emailAddress: string){
        let newContact = new Contact(fullName, contactNumber, emailAddress);
        if(newContact.serialize()){
            console.log(newContact.FullName);
            let key = newContact.FullName.substring(0,1) + Date.now();
            let value = newContact.serialize();
            if (value != ""){
                localStorage.setItem(key, newContact.serialize());
                console.log(`local storage: ${localStorage.getItem(key)} | contact serialize: ${newContact.serialize()}`);
            }
            else(console.log("FAILED TO SERIALIZE CONTACT DATA"));
        }
    }

    function DisplayAboutUsPage(){
        console.log("ABOUT US PAGE");
    }

    function DisplayContactPage(){
        console.log("CONTACT PAGE");
        let fullName = document.querySelector("#full-name") as HTMLInputElement;
        let contactNumber = document.querySelector("#contact-number") as HTMLInputElement
        let emailAddress = document.querySelector("#email-address") as HTMLInputElement;
        let errorMessages = document.querySelector("#error-message") as HTMLInputElement;
        let sendButton = document.querySelector("#send-button") as HTMLInputElement;
        let subscribeCheckbox = document.getElementById("subscribe-checkbox") as HTMLInputElement;


        sendButton.addEventListener("click", function(event){
            if(subscribeCheckbox.hasAttribute("checked")){
                event.preventDefault();
                AddContact(fullName.value as string,
                    contactNumber.value as string,
                    emailAddress.value as string)
            }
        })

        ValidateContactPage(errorMessages);
    }

    function ValidateContactPage(errorMessages: HTMLInputElement){
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
    function ValidateElementInput(elementId: string, expression: RegExp, errorElement: HTMLInputElement | null = null, errorMessage: string = ""){
        let inputElement = document.querySelector(`#${elementId}`) as HTMLInputElement
        let result = false;

        inputElement.addEventListener("blur", function(){
            if (!expression.test(inputElement.value as string)){
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

    function AddErrorToPage(messageElement: HTMLInputElement, errorMessage: string){
        console.log(errorMessage)
        errorMessage = `- ${errorMessage}\n`
        console.log(errorMessage)
        messageElement.removeAttribute("hidden");
        messageElement.setAttribute("class", "col-lg-12 col-md-10 alert alert-danger")
        if(!messageElement.innerText.includes(errorMessage)){
            messageElement.innerText += errorMessage;
        }
    }

    function RemoveErrorFromPage(messageElement: HTMLInputElement, errorMessage: string){
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
            let contactList = document.querySelector("#contact-list") as Element;

            let data = "";
            let keys = Object.keys(localStorage);

            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key) as string;
                let contact = new Contact("","","");

                contact.deserialize(contactData);
                // data += `<tr><th scope="row" class="text-center">${index}</th>
                //         <td>${contact.FullName}</td>
                //         <td>${contact.ContactNumber}</td>
                //         <td>${contact.EmailAddress}</td>
                //
                //         <td class="text-center">
                //             <button value="${key}" class="btn btn-primary btn-sm edit">
                //                 <i class="fas fa-edit fa-sm"> edit</i>
                //             </button>
                //         </td>
                //         <td class="text-center">
                //             <button value="${key}" class="btn btn-danger btn-sm delete">
                //                 <i class="fas fa-edit fa-sm"> delete</i>
                //             </button>
                //         </td>
                //         </tr>`;
                index++;
                contactList.innerHTML = data;
                $("button.edit").on("click", function(){
                    location.href = `/edit#${$(this).val()}`
                })

                $("button.delete").on("click", function (){

                    if(confirm(`Are you sure you want to delete this entry?`) ){
                        localStorage.removeItem($(this).val() as string);
                        location.href = "/contact-list";
                    }
                })

            }
            //console.log($("button.delete"));
        }
        $("#add-button").on("click", () =>{
            location.href = "/edit#add"
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
        let fullName = document.querySelector("#full-name") as HTMLInputElement;
        let contactNumber = document.querySelector("#contact-number") as HTMLInputElement;
        let emailAddress = document.querySelector("#email-address") as HTMLInputElement;
        let page = location.hash.substring(1);

        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#edit-button").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);

                $("#edit-button").on("click", (event) =>{
                    event.preventDefault();
                    AddContact(fullName.value,
                        contactNumber.value,
                        emailAddress.value
                    );

                    location.href = "/contact-list";
                })
                $("#cancel-button").on("click", () =>{
                    location.href = "/contact-list";
                })
                break;
            default:{
                let editContact = new Contact("","","")
                console.log(page);
                editContact.deserialize(localStorage.getItem(page) as string)

                $("#full-name").val(editContact.FullName);
                $("#contact-number").val(editContact.ContactNumber);
                $("#email-address").val(editContact.EmailAddress);

                $("#edit-button").on("click", function(event){
                    event.preventDefault();
                    if(confirm(`Are you sure you want to make these changes to ${editContact.FullName} ?`)) {
                        editContact.FullName = fullName.value as string;
                        editContact.EmailAddress = emailAddress.value as string;
                        editContact.ContactNumber = contactNumber.value as string;

                        localStorage.setItem(page, editContact.serialize())
                        location.href = "/contact-list";
                    }
                })
                $("#cancel-button").on("click", function (){
                    location.href = "/contact-list"
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
        let usernameInput = document.querySelector("#username") as HTMLInputElement;
        let passwordInput = document.querySelector("#password") as HTMLInputElement;
        let loginButton = document.querySelector("#login-button") as HTMLInputElement;

        loginButton.addEventListener("click", function AttemptLogin(){

            AjaxRequest("GET", "./data/user.json", function GetUserData(userData: string){
                for (const user of JSON.parse(userData).users){
                    if (user.Username === usernameInput.value &&
                        user.Password === passwordInput.value)
                    {
                        console.log("match")
                        let foundUser = new core.User();
                        foundUser.fromJSON(user)
                        if(typeof foundUser.serialize()  === "string")
                        {
                            sessionStorage.setItem("user", foundUser.serialize() as string)
                            successFlag = true;
                        }
                        break;
                    }
                }
                if(successFlag) {
                    RemoveErrorFromPage(document.querySelector("#error-message") as HTMLInputElement,
                        "Failed to Login");
                    location.href = "/";
                } else{
                    AddErrorToPage(document.querySelector("#error-message") as HTMLInputElement,
                        "Failed to Login");
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
    function AjaxRequest(method:string, url:string, callback: Function){
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState == 2 || xhr.readyState == 3 || xhr.readyState == 4){
                console.log(`Communicating with ${url} at ${Date.now()}: READY STATE-${xhr.readyState} | ${xhr.status}`);
            }
            if (xhr.readyState == 4 && xhr.status == 200 && typeof callback === "function" && callback.length === 1){
                callback(xhr.responseText);
            }
        })
        xhr.open(method, url);
        xhr.send();
    }
    // function LoadHeader(htmlData: string){
    //     let header = document.querySelector("header") as Element;
    //     header.innerHTML  = htmlData;
    //     $(`li>a:contains(${document.title})`).addClass("active");
    //     CheckLogin();
    //     AddNavigationEvents();
    //     console.log("Finished Loading Header")
    // }

    // function AddNavigationEvents(){
    //     let NavLinks = document.querySelectorAll("a");
    //     console.log(NavLinks)
    //     for(const NavLink of NavLinks){
    //         NavLink.addEventListener("click", function SetLinks(event){
    //             event.preventDefault();
    //             //console.log(NavLink.getAttribute("href"));
    //             LoadLink(NavLink.getAttribute("href") as string);
    //             history.replaceState(null, "",`${router.ActiveLink}` );
    //
    //         });
    //     }
    // }

    // function AddBodyNavigationLink(){
    //     let NavLinks = document.querySelectorAll("main.container a");
    //     console.log(NavLinks)
    //     for(const NavLink of NavLinks){
    //         NavLink.addEventListener("click", function SetLinks(event){
    //             event.preventDefault();
    //             //console.log(NavLink.getAttribute("href"));
    //             LoadLink(NavLink.getAttribute("href") as string);
    //             NavLink.removeEventListener("click", SetLinks)
    //             //normally this would get rid of event.preventDefault() after one click which would be a problem.
    //             //This is fine here because we are expecting links in the main body to disappear anyway
    //
    //             history.replaceState(null, "",`${router.ActiveLink}` );
    //         });
    //     }
    // }

    function capitalizeFirstCharacter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function CheckLogin(){
        if(sessionStorage.getItem("user") != null){
            let loginNavAnchor =document.querySelector("#login>a") as HTMLAnchorElement
            let loginNavListItem = document.querySelector("#login>a") as Element
            loginNavAnchor.innerText =" Logout"
            loginNavListItem.addEventListener("click", function LogoutFunctionality(){
                sessionStorage.clear();
                location.href = "/login"
            })
        }
    }

    // function LoadContent(){
    //     let page = router.ActiveLink;
    //     let pageContentsCallback = ActiveLinkCallback();
    //     console.log(`Loading Content for Active Link: ${page}`);
    //     console.log(pageContentsCallback)
    //
    //     AjaxRequest("GET", `./views/content/${page}.html`, function(htmlData: string){
    //         $("main.container").html(htmlData)
    //         CheckLogin();
    //         pageContentsCallback();
    //         AddBodyNavigationLink()
    //     });
    //
    // }

    // function LoadLink(link: string, data = "") {
    //     console.log(`pathname (activelink) before assignment: ${router.ActiveLink} `)
    //     if(router.Find(link) === -1){
    //         link = "/404"
    //     }
    //     router.ActiveLink = link;
    //     document.title = capitalizeFirstCharacter(router.ActiveLink.slice(1));
    //     LoadContent();
    // }

    // function ActiveLinkCallback(){
    //     switch(router.ActiveLink){
    //         case "" :
    //         case "/" :
    //         case "/home" : return DisplayHomePage;
    //         case "/about" : return DisplayAboutUsPage;
    //         case "/services" : return DisplayServicesPage;
    //         case "/contact" : return DisplayContactPage;
    //         case "/contact-list" : return DisplayContactListPage;
    //         case "/products" : return DisplayProductsPage;
    //         case "/register" : return DisplayRegisterPage;
    //         case "/login" : return DisplayLoginPage;
    //         case "/edit" : return DisplayEditPage;
    //         case "/404" : return function (){};
    //         default:
    //             console.log(`Callback for ${router.ActiveLink} does not exist`);
    //             return function (){};
    //             break;
    //     }
    // }

    function fetchAndPromiseTestOne(){
        let inProgressUrlRequest = fetch(new Request(`./views/content/${router.ActiveLink}.html`));
        let urlRequestResponse;
        let resolvedRequestData = ""

        inProgressUrlRequest.then(function(urlResponse){
            console.dir(urlResponse)
            urlRequestResponse = urlResponse
                .text().then(function (urlData){
                    resolvedRequestData = urlData
                    console.log(resolvedRequestData)
                })
        })
    }
    async function fetchAndPromiseTestTwo(){
        let urlRequestResponse = await fetch(new Request(`./views/content/${router.ActiveLink}.html`));
        let resolvedRequestData = await urlRequestResponse.text()
        console.log(resolvedRequestData)
    }

    function Start(){
        console.log(`Client-Side App Started - ${router.ActiveLink}` );
        const body = document.querySelector("body");


        //AjaxRequest("GET", "./views/components/header.html", LoadHeader);
        CheckLogin()


        if (body instanceof HTMLBodyElement){
            switch (body.getAttribute("id")){
                case "" :
                case "/" :
                case "/home" : DisplayHomePage(); break;
                case "/about" : DisplayAboutUsPage(); break;
                case "/services" :  DisplayServicesPage(); break;
                case "/contact" :  DisplayContactPage(); break;
                //case "/contact-list" :  DisplayContactListPage();
                case "/products" :  DisplayProductsPage(); break;
                case "/register" :  DisplayRegisterPage(); break;
                case "/login" :  DisplayLoginPage(); break;
                case "/edit" :  DisplayEditPage(); break;
                case "/404" : DisplayHomePage(); break;
                default:
                    console.log(`Callback for ${router.ActiveLink} does not exist`);
                    break;
            }
        }
    }

    window.addEventListener("load", Start)
})();