import axios from "axios";
let evolutionurl;
let evolution;
export default async function handler(req, res) {
    const { level } = req.query
    const { name } = req.query
    console.log(name)
    console.log(level)
    try {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + name)
        .then(response => {
            let experience;
            if(response.data.growth_rate.name == "medium") {
                experience = (level) ** 3;
                return res.status(200).json({"experience" : experience})
            } else if (response.data.growth_rate.name == "medium-slow") {
                experience = (6/5) * (level) ** 3 - (15 * (level ** 2)) - 140;
                return res.status(200).json({"experience" : experience})
            } else if(response.data.growth_rate.name == "slow") {
                experience = (5(level) ** 3) / 4;
                return res.status(200).json({"experience" : experience})
            } else if(response.data.growth_rate.name == "fast") {
                experience = (4(level) ** 3) / 5;
                return res.status(200).json({"experience" : experience})
            } else if(response.data.growth_rate.name == "slow-then-very-fast") {
                if(level < 50) {
                    experience = ((level)**3 * (100-level)) / 50;
                } else if (level >= 50 && level < 68) {
                    experience = ((level)**3 * (150-level)) / 100;
                } else if (level >= 68 && level < 98) {
                    experience = ((level)**3 * ((1911-(10 *level))/3)) / 500;
                } else if (level >= 98 && level < 100) {
                    experience = ((level)**3 * (160-level)) / 100;
                }
                return res.status(200).json({"experience" : experience})
            }  else if(response.data.growth_rate.name == "fast-then-very-slow") {
                if(level < 15) {
                    experience = ((level)**3 * (24 + (level + 1) / 3)) / 50;
                } else if (level >= 15 && level < 36) {
                    experience = ((level)**3 * (14+level)) / 50;
                } else if (level >= 36 && level < 100) {
                    experience = ((level)**3 * (32+(level/2)))/ 50;
                }
                return res.status(200).json({"experience" : experience})
            } 
        })
    } catch (err) {
        res.status(500);
        console.log("hi")
    }
}