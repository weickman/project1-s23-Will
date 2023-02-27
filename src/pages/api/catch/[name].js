import axios from "axios";


export default async function handler(req, res) {
    const { name } = req.query
    try {
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(response => {
            let N = Math.floor(Math.random() * 255 + 1);
            let ball = Math.floor(Math.random() * 255 + 1);
            let caught;
            let HP_max;
            let HP_current;
            let f;
            HP_max = response.data.stats[0].base_stat
            console.log(HP_max)
            HP_current = Math.floor(Math.random() * HP_max + 1);
            console.log(HP_current)
            f = (HP_max * 255 * 4) / (HP_current * ball);
            console.log(f)
            if(f >= N) {
                caught = true;
            } else {
                caught = false;
            }
            console.log(caught)
            res.status(200).json({"caught" : caught})
        })
    } catch (err) {
        res.status(500);
    }
}