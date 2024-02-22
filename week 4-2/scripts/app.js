//IFFE
(function(){

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
        let newContact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
        if(newContact.serialize()){
            console.log(newContact.FullName);
            let key = newContact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, newContact.serialize());
            console.log( newContact);
            console.log("done");
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

        let sendButton = document.getElementById("send-button");
        let subscribeCheckbox = document.getElementById("subscribe-checkbox");

        sendButton.addEventListener("click", function(){
            if(subscribeCheckbox.checked){
                event.preventDefault();
                AddContact(fullName.value, contactNumber.value, emailAddress.value)
            }
        })
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
                let contact = new Contact();

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
                console.log(data);
                console.log(contactList);
                contactList.innerHTML = data;
            }

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
        let page = location.hash.substring(1);
        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);
                break;
            default:{

            }
            break;
        }
    }

    function Start(){
        console.log("App Started");

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;


        }
    }



    window.addEventListener("load", Start)
})();