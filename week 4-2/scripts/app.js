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
            case "Edit":
                DisplayEditPage();
                break;


        }
    }



    window.addEventListener("load", Start)
})();