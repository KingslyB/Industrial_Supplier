const hello = require("./hello.js");
const userData = require("./users.data.json.js");
//const fs = require("node:fs");

// hello.sayHello();
// hello.sayGoodbye();
// hello.sayMessage("This is a message of my choosing!");


// async function test() : Promise<void>
// {
//     await fs.readFile("../data/user.json", "utf-8", function callBack(err:Error, data: string)
//     {
//         if(err)
//         {
//              console.error(`ERROR: ${err.message}`);
//         }
//     console.log(data);
//     })
// }
// test();

userData()
    .then (function fulfilled(data:string)
    {
        hello.sayHello();
        hello.sayMessage(data);
        hello.sayGoodbye();
    }, function thenRejected(reason:any)
    {
        console.log(`THEN-REJECT: ${reason}`);
    })
    .catch(function catchRejected(failure:any)
    {
        console.log(`CATCH: ${failure}`)
    });

