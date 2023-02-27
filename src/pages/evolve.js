import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useRef } from 'react'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Evolve() {
    const inputRef = useRef(null)
    const [name, setName] = useState('');
    function setUrl(){
        let url = "/api/evolve/" + name;
        console.log(url)
        return url;
    }
    const handleChange = () => {
        setName(inputRef.current.value);
      };
    const { data, error, isLoading, isValidating } = useSWR(setUrl(), fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <div>
                        <form onSubmit={handleChange}>
                        <label for="name">Enter Pokemon Name: </label>
                        <input type="text" id="name" ref={inputRef}/>
                        <button type="submit" id="submit" >Submit</button>
                        </form>
                    </div>
        </>
    )
    let { evolution } = data


    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <div>
                        <form onSubmit={handleChange}>
                        <label for="name">Enter Pokemon Name: </label>
                        <input type="text" id="name" ref={inputRef}/>
                        <button type="submit" id="submit" >Submit</button>
                        </form>
                    </div>
            <h2>Name: {name}</h2>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Next Evolution: {evolution}</h2>
                </>
            )}
        </>
    )
}