//IFFE
(function(){

    function DisplayHomePage(){
        console.log("HOME PAGE");
        let aboutUsButton  = document.getElementById("AboutUsBtn");

        aboutUsButton.addEventListener("click", function(){
            location.href = "about.html";
        })
    }

    function DisplayAboutUsPage(){
        console.log("ABOUT US PAGE");
        let aboutUsButton  = document.getElementById("Btn");
    }

    function DisplayContactPage(){
        console.log("CONTACT PAGE");
        let aboutUsButton  = document.getElementById("Btn");
    }

    function DisplayProductsPage(){
        console.log("PRODUCTS PAGE");
        let aboutUsButton  = document.getElementById("Btn");
    }

    function DisplayServicesPage(){
        console.log("SERVICES PAGE");
        let aboutUsButton  = document.getElementById("Btn");
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