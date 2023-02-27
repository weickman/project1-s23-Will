import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useRef } from 'react'
const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Exp() {
    const nameRef = useRef(null)
    const levelRef = useRef(null)
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    function setUrl(){
        let url = `/api/experience/${name}?name=${name}&level=${level}`;
        console.log(url)
        return url;
    }
    const handleChange = () => {
        setName(nameRef.current.value);
        setLevel(levelRef.current.value)
      };
    const { data, error, isLoading, isValidating } = useSWR(setUrl(), fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <form onSubmit={handleChange}>
                        <label for="name">Enter Pokemon Name: </label>
                        <input type="text" id="name" ref={nameRef}/>
                        <p></p>
                        <label for="level">Enter Pokemon Level: </label>
                        <input type="text" id="level" ref={levelRef}/>
                        <p></p>
                        <button type="submit" id="submit" >Submit</button>
            </form>
        </>
    )
    let { experience } = data

    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Name: {name}</h2>
            <h2>Level: {level}</h2>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Experience: {experience}</h2>
                </>
            )}
        </>
    )
}