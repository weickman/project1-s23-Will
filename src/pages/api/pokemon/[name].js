import axios from "axios";

export default async function handler(req, res) {
    const { name } = req.query
    try {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(response => {
            let types = [];
            response.data.types.forEach(i => {
                types.push(i.type.name);
            })
            res.status(200).json({ "pokemonName" : name, "sprite" : response.data.sprites.front_default , "types" : types})
        })
    } catch (err) {
        res.status(500);
    }
}