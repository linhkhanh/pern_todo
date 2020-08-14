const express   = require('express');
const app       = express();
const PORT      = process.env.PORT || 5000;
const cors      =require('cors');

//middleware
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server has started on PORT ${PORT}`);
});