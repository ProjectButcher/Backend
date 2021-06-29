// This is the main server script

import express from 'express' // Express is used to manage API actions

const app = express() // Assign a main app object

// We keep listening to port 3000 while the server is running
app.listen('3000', () => {
  console.log('Server is running !')
})
