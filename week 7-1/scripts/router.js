(function (core){
    class Router{
        //public properties
        get ActiveLink(){
            return this.m_activeLink;
        }

        set ActiveLink(link){
            this.m_activeLink = link;
        }

        //constructor
        constructor(){
            this.ActiveLink = "";
        }

        //public methods
        Add(route){
            this.m_routingTable.push(router);
        }

        AddTable(routeTable){
            this.m_routingTable = routeTable;
        }

        Find(route){
            return this.m_routingTable.indexOf(route);
        }

        Remove(route){
            if(this.Find(route) > -1){
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false
        }

        toString(){
            return this.m_routingTable.toString();
        }
        //public override
    }

    core.Router = Router;

})(core || (core = {}));

let router = new core.Router();
router.AddTable([
    "/",
    "/home",
    "/about",
    "/contact",
    "/contact-list",
    "/edit",
    "/login",
    "/products",
    "/register",
    "/services"
]);

let route = location.pathname;

router.ActiveLink = (router.Find(route) > -1)  ?
    (route === "/") ? "home" : route.substring(1)
    : ("404");