import axios from "axios";
let evolutionurl;
let evolution;
export default async function handler(req, res) {
    const { name } = req.query
    try {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + name)
        .then(response => {
            evolutionurl = response.data.evolution_chain.url
        })
        console.log(evolutionurl)
        const result2 = await axios.get(evolutionurl)
        .then(response => {
            if(response.data.chain.species.name == name) {
                return res.status(200).json({"evolution" : response.data.chain.evolves_to[0].species.name})
            } else if(response.data.chain.evolves_to[0].species.name == name) {
                return res.status(200).json({"evolution" : response.data.chain.evolves_to[0].evolves_to[0].species.name})
            } else if(response.data.chain.evolves_to[0].evolves_to[0].species.name == name){
                return res.status(200).json({"evolution" : name})
            }
        })
    } catch (err) {
        res.status(500);
        console.log("hi")
    }
}