const fs = require('fs')
                                                         
const watcher = fs.watch("notes.txt", (eventtype, filename)=>{ 
   console.log("Event: ", eventtype)
   console.log("filename",filename)
})

