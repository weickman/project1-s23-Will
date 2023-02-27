import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useRef } from 'react'

const fetcher = async (url) => {
    const res = await axios.get(url)
    console.log(res.data)
    return res.data
}

export default function Name() {
    const inputRef = useRef(null)
    const [name, setName] = useState('');
    function setUrl(){
        let url = "/api/pokemon/" + name;
        console.log(url)
        return url;
    }
    const handleChange = () => {
        setName(inputRef.current.value);
      };
    let { data, error, isLoading, isValidating } = useSWR(setUrl(), fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <div>
                    <form onSubmit={handleChange}>
                        <label for="name">Enter Pokemon Name: </label>
                        <input type="text" id="name" ref={inputRef}/>
                        <button type="submit" id="submit">Submit</button>
                    </form>
                    </div>
        </>
    )

    let { pokemonName, sprite, types } = data


    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <div>
                        <form onSubmit={handleChange}>
                        <label for="name">Enter Pokemon Name: </label>
                        <input type="text" id="name" ref={inputRef}/>
                        <button type="submit" id="submit" >Submit</button>
                        </form>
                    </div>
                    <h2>Name: {pokemonName}</h2>
                    <img src={sprite} />
                    <h2>Types: {types.map(type => <span>{type} </span>)}</h2>
                </>
            )}
        </>
    )
}