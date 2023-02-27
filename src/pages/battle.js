import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useRef } from 'react'

const fetcher = async (post) => {
    let url = `/api/battle`;
    const res = await axios.post(url, {
        pokemon1: post.pokemon1,
        pokemon2: post.pokemon2
    })
    return res.data
}

export default function Battle() {
    const name1Ref = useRef(null)
    const name2Ref = useRef(null)
    const [name1, setName1] = useState('pikachu');
    const [name2, setName2] = useState('lucario');
    function setUrl(){
        return { pokemon1 : name1, pokemon2 : name2 };
    }
    const handleChange = () => {
        setName1(name1Ref.current.value);
        setName2(name2Ref.current.value);
      };
    console.log(name1)
    const { data, error, isLoading, isValidating } = useSWR(setUrl(), fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <form onSubmit={handleChange}>
                        <label for="name1">Enter Pokemon Name: </label>
                        <input type="text" id="name1" ref={name1Ref}/>
                        <label for="name2">Enter Pokemon Name: </label>
                        <input type="text" id="name2" ref={name2Ref}/>
                        <button type="submit" id="submit" >Submit</button>
            </form>
        </>
    )
    let { winner } = data
    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <form onSubmit={handleChange}>
                        <label for="name1">Enter Pokemon Name: </label>
                        <input type="text" id="name1" ref={name1Ref}/>
                        <p></p>
                        <label for="name2">Enter Pokemon Name: </label>
                        <input type="text" id="name2" ref={name2Ref}/>
                        <p></p>
                        <button type="submit" id="submit" >Submit</button>
            </form>
            <h2>Battle: {name1} vs. {name2}</h2>

            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Winner: {winner}</h2>
                </>
            )}
        </>
    )
}