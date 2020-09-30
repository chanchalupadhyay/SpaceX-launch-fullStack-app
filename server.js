const express=require('express')
const request=require('request')
const rest =require('restler')
const  bodyParser=require('body-parser');
const { json } = require('restler');

const app=express();
const PORT=process.env.PORT || 6000;
app.use(bodyParser.json())



app.get('/get',(req,res)=>{

    rest.get("https://api.spaceXdata.com/v3/launches?limit=100").on('complete',(data)=>{
        if (data instanceof Error) {
            console.log('Error:', data.message);
            this.retry(5000); // try again after 5 sec
          } else
          {  
              let storeApiData=[];
              data.map(data=>{
                let flight_number=data.flight_number
                let mission_id=data.mission_id
                let launch_year=data.launch_year
                let image=data.links['mission_patch']
                let launch_success=data.launch_success
                let mission_name=data.mission_name

                   storeApiData.push({flight_number,mission_id,launch_success,image,launch_year,mission_name})
              }
                  
              )
              res.send(storeApiData);
          }


          
    })
})

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))