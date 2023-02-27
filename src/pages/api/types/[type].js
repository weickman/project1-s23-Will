import axios from "axios";

export default async function handler(req, res) {
    const { type } = req.query
    try {
        const result = await axios.get("https://pokeapi.co/api/v2/type/" + type)
        .then(response => {
            let pokemon = [];
            response.data.pokemon.forEach(i => {
                pokemon.push(i.pokemon.name);
                console.log(response.data.pokemon)
            })
            console.log(pokemon)
            res.status(200).json({type, pokemon})
        })
    } catch (err) {
        res.status(500);
    }
}