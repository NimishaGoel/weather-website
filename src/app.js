const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const path= require("path")
const express = require("express")
const hbs =require("hbs")

const app= express()
const port= process.env.PORT || 3000

const publicDirectoryPath= path.join(__dirname,'../public')
const partialsPath= path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'));
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name : 'Nimisha Goel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About the author',
        name : 'Nimisha Goel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name : 'Nimisha Goel'
    })
})

app.get('/view-weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error: "Please enter the location"
        })
    }
    const address=req.query.address;
    geocode(address,(error,{latitude,longitude,location} = {})=>{
        if(error)
            return res.send(error)
        
        forecast(latitude, longitude,(error,forecastData) =>{
            if(error)
            {
                return res.send({error})
                }
                else
                {
                    res.send({
                        forecast : forecastData,
                        location,
                        address
                    })
                }
            })
        }
    )
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Nimisha Goel',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Nimisha Goel',
        errorMessage: 'Page not found'
    })
})
app.listen(port, ()=>{
    console.log("Server is up and running on port 3000")
})