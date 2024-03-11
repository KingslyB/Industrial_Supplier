const fsPromises = require('fs/promises'); //FileSystem


/**
 * Reads the existing user data from data folder.
 * Outputs to Console.
 * @constructor
 */
async function ReadUsers() : Promise<string>
{
    return await fsPromises.readFile("./data/user.json", "utf-8", function callback(err:Error, data: string) //HOW COME A CALLBACK IS ALLOWED??
    {
        if(err)
        {
             console.error(`ERROR: ${err.message}`);
        }
    //console.log(data);
    return data;
    })
}

module.exports = ReadUsers;

