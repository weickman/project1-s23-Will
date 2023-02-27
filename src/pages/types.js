import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useRef } from 'react'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Types() {
    const inputRef = useRef(null)
    const [type, setType] = useState('');
    const handleChange = () => {
        setType(inputRef.current.value);
      };
    console.log(type)
    function setUrl(){
        let url = "/api/types/" + type;
        console.log(url)
        return url;
    }
    const { data, error, isLoading, isValidating } = useSWR(setUrl(), fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <form onSubmit={handleChange}>
                    <label for="type">Enter Pokemon type: </label>
                    <input type="text" id="type" ref={inputRef}/>
                    <button type="submit" id="submit">Submit</button>
            </form>
        </>
    )
    let { pokemon } = data


    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                <form onSubmit={handleChange}>
                        <label for="type">Enter Pokemon Name: </label>
                        <input type="text" id="type" ref={inputRef}/>
                        <button type="submit" id="submit">Submit</button>
                    </form>
                    <h2>Type: {type}</h2>
                    <ul>{pokemon.map(poke => <li>{poke}</li>)}</ul>
                </>
            )}
        </>
    )
}