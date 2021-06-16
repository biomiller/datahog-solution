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

app.post("/getData", (req, res, next) => {

    const acceptedProviders = [
        "gas", 
        "internet",
    ]
    let provider;

    if(acceptedProviders.includes(req.body.provider)){
        provider = req.body.provider;
        axios
            .get(datahogURL + provider)
            .then(response => res.json(response.data))
            .catch (error => next(error))
    } else {
        res.send("Invalid provider supplied");
    }

});