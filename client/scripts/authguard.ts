(( function()
{
    console.log(`Location.pathname: ${location.pathname}`);
    console.log(`Attempted ActiveLink: ${router.ActiveLink}`);
    let protected_route = [
        "/contact-list",
        "/edit"
    ];

    if(protected_route.indexOf(router.ActiveLink) >-1) {

        if (!sessionStorage.getItem("user")) {
            location.href = "/login";
        }

    }


}))();