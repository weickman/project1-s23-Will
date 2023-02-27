import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useRef } from 'react'

const fetcher = async (url) => {
    const res = await axios.post(url, {
        pokemon: "pikachu"
    })
    return res.data
}
export default function Battle() {
    const inputRef = useRef(null)
    const [name, setName] = useState('');
    function setUrl(){
        let url = "/api/catch/" + name;
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
            <form onSubmit={handleChange}>
                        <label for="name">Enter Pokemon Name: </label>
                        <input type="text" id="name" ref={inputRef}/>
                        <button type="submit" id="submit" >Submit</button>
            </form>
        </>
    )
    let { caught } = data
    console.log(caught)
    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Catching: {name}</h2>

            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    {caught ? (
                        <h2>{name} has been caught!</h2>
                    ) : (
                        <h2>{name} broke free!</h2>
                    )}
                </>
            )}
        </>
    )
}