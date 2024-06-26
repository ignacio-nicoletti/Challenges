import { useEffect, useState } from "react"



export default function App() {
    const [word, setWord] = useState()
    const [image, setImage] = useState()


    const url_Word = "https://catfact.ninja/fact"
    const url_img = `https://cataas.com/cat/says/${word}`


    useEffect(() => {
        fetch(url_Word)
            .then(res => res.json())
            .then(data => setWord(data.fact.slice(" ", 3)))

    }, [])

    useEffect(() => {
        fetch(url_img)
            .then(data => setImage(data.url))

    }, [word])



    return (
        <>
            <h1>{word}</h1>
            <img src={image} alt={`imagen random obtenida con el texto ${word}`} />


        </>
    )


}