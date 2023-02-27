import axios from "axios";

export default async function handler(req, res) {
    const { pokemon1 } = req.body
    const { pokemon2 } = req.body
    let stat1;
    let stat2;
    try {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon1)
        .then(response => {
            stat1 = response.data.stats[0].base_stat;
            console.log(stat1)
        })
        const result2 = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon2)
        .then(response => {
            stat2 = response.data.stats[0].base_stat
            if(stat1 > stat2) {
                return res.status(200).json({"winner" : pokemon1})
            } else if(stat2 > stat1) {
                return res.status(200).json({"winner" : pokemon2})
            } else {
                return res.status(200).json({"winner" : "It was a tie."})
            }
        })
    } catch (err) {
        res.status(500);
        console.log("hi")
    }
}