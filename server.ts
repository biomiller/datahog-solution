import express from "express"
import cors from "cors";
import axios from "axios"
import bodyParser from "body-parser";

const port = 3001;
const datahogURL = "http://localhost:3000/providers/";

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.listen(port, () => console.log(`App running on port ${port}`))

function makeRequest(url: string): any{
    return axios
    .get(url)
    .then(response => {
        if(response.status == 200){
            return(response.data);
        } else {
            return makeRequest(url)
        }
    })
    .catch(error => {
        return makeRequest(url)
    })
}
 
app.post("/getData", (req, res,) => {

    const acceptedProviders = [
        "gas", 
        "internet",
    ]
    let provider: string;
    let callbackUrl: string;

    if(acceptedProviders.includes(req.body.provider) && req.body.callbackUrl){
        provider = req.body.provider;
        callbackUrl = req.body.callbackUrl;

        makeRequest(datahogURL + provider).then((response: any) => {
            app.get(callbackUrl, (req, res,) => {
                res.send(response);
            })
        })

        res.sendStatus(200)
    
    } else {
        res.send("Invalid body");
    }
});

