import axios from "axios"
import express, { query } from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000
const query_var = `
query ($id: Int) { # Define which variables will be used in the query (id)
Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
    romaji
    english
    native
    }
}
}
`;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",async(req,res)=>{
    try{    
        var variables = {
            id: Math.floor(Math.random()*1000+1)
        };
        var body={
            query:query_var,            variables:variables
        }
        console.log(variables)
    let appdata = await axios.post("https://graphql.anilist.co",body)
    const data_fin =appdata.data
    console.log(data_fin.data)
    res.render("index.ejs",{anime_title:JSON.stringify(data_fin.data.Media.title.english),id:variables.id})
    }
    catch(error){
        console.log(error.response.data)
        var variables = {
            id: Math.floor(Math.random()*10+1)
        };
        var body={
            query:query_var,
            variables:variables
        }
        console.log(variables)
        let appdata = await axios.post("https://graphql.anilist.co",body)
        const data_fin =appdata.data
        console.log(data_fin.data)
        res.render("index.ejs",{anime_title:JSON.stringify(data_fin.data.Media.title.english),id:variables.id})
    }
})

app.post("/id",async(req,res)=>{
    try{    
        var variables = {
            id: req.body.id_text
        };
        var body={
            query:query_var,            
            variables:variables
        }
        console.log(variables)
        let appdata = await axios.post("https://graphql.anilist.co",body)
        const data_fin =appdata.data
        console.log(data_fin.data)
        res.render("index.ejs",{anime_title:JSON.stringify(data_fin.data.Media.title.english),id:variables.id})
    }
    catch(error){
        console.log(error)
        var variables = {
            id: 1
        };
        var body={
            query:query_var,
            variables:variables
        }
        console.log(variables)
        let appdata = await axios.post("https://graphql.anilist.co",body)
        const data_fin =appdata.data
        console.log(data_fin.data)
        res.render("index.ejs",{anime_title:JSON.stringify(data_fin.data.Media.title.english),id:variables.id})
    }
})


app.listen(port,()=>
{
    console.log(`Server is running on port ${port}`)
})