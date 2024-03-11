const helloMessage: string = "Hello, World!";
const goodbyeMessage: string = "Goodbye!";

/**
 * Output helloMessage: "Hello, World!" to console.
 */
function sayHello() :void
{
    console.log(helloMessage);
}

function sayGoodbye() :void
{
    console.log(goodbyeMessage)
}

/**
 * Console log `message`
 * @param message message to be outputted to the console
 */
function sayMessage(message: string) :void
{
    console.log(message)
}

module.exports = {
    sayHello,
    sayGoodbye,
    sayMessage

};