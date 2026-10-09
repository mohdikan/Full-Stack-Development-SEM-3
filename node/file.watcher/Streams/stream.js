
const fs = require('fs')

// readable stream
const readstream = fs.createReadStream("intro.txt",{encoding:"utf8",highwatcherMark:10}}

readstream.on("data",(chunk)=>{
    console.log("Data received")
    console.log("Data:",chunk);

})
// writeable stream
const writerStream =  fs.createWriteStream("output.txt")
// WriteStream.write("Hello")  

readstream.pipe
