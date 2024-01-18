//IFFE
(function(){

    function DisplayHomePage(){
        console.log("HOME PAGE");
        let aboutUsButton  = document.getElementById("AboutUsBtn");

        aboutUsButton.addEventListener("click", function(){
            location.href = "about.html";
        })

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");

        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is my first paragraph";
        MainContent.appendChild(MainParagraph);

        let FirstString = "This is";
        let SecondString = `${FirstString} the main paragraph`;
        MainParagraph.textContent = SecondString;
        MainContent.appendChild(MainParagraph);

        let DocumentBody = document.body;
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container");
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);

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