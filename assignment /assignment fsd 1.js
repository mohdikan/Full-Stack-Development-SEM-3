// Problem

// A callback that is sometimes executed synchronously and sometimes asynchronously can cause unpredictable execution order. This situation is known as “releasing Zalgo.”

// Solution

// We can make the callback always asynchronous by wrapping it inside "process.nextTick()".

function doSomething(callback) {
    console.log("Start");

    // Always execute the callback asynchronously
    process.nextTick(() => {
        callback();
    });

    console.log("End");
}

doSomething(() => {
    console.log("Callback executed");
});

//Output

//Start
//End
//Callback executed

//Explanation

//If the callback is called directly:

callback();

//it executes synchronously, which means it runs immediately.

//By using:

process.nextTick(() => {
    callback();
});

//the callback is scheduled to execute after the current synchronous code has finished.

Therefore, the execution order becomes:

Start
End
Callback executed

This ensures that the callback is always asynchronous, making the behavior predictable and avoiding “releasing Zalgo.”

Alternative

"setImmediate()" can also be used:

function doSomething(callback) {
    console.log("Start");

    setImmediate(() => {
        callback();
    });

    console.log("End");
}

Both approaches make the callback asynchronous, but "process.nextTick()" runs before the event loop proceeds to the next phase, while "setImmediate()" runs in the event loop's check phase.