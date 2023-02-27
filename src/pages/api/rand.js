import axios from "axios";

export default async function handler(req, res) {
    let num = Math.floor(Math.random() * 1008 + 1);
    try {
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + num)
        .then(response => {
            let types = [];
            response.data.types.forEach(i => {
                types.push(i.type.name);
            })
            console.log(response.data)
            return res.status(200).json({ "name" : response.data.name, "sprite" : response.data.sprites.front_default , "types" : types})
        })
    } catch (err) {
        console.log("error")
        res.status(500);
    }
}
