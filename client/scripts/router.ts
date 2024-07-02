namespace core {

    export class Router {

        private m_activeLink: string;
        private m_linkData: string;
        private m_routingTable: string[];
        //client properties

        //constructor
        constructor() {
            this.m_activeLink = "";
            this.m_linkData = "";
            this.m_routingTable = [];
        }

        get ActiveLink() {
            return this.m_activeLink;
        }

        set ActiveLink(link) {
            this.m_activeLink = link;
        }


        //client methods
        Add(route: string): void {
            this.m_routingTable.push(route);
        }

        AddTable(routeTable: string[]) {
            this.m_routingTable = routeTable;
        }

        Find(route: string) {
            return this.m_routingTable.indexOf(route);
        }

        Remove(route: string) {
            if (this.Find(route) > -1) {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false
        }

        toString() {
            return this.m_routingTable.toString();
        }

        //client override
    }
}

let router = new core.Router;
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
    (route === "/") ? "/home" : route //route.substring(1) cuts off the "/" from the routingtable
    : ("/404");

