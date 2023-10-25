import React, { useEffect, useState } from 'react'

const App = () => {

    const [notas, setNotas] = useState(null)

    const [nota, setNota] = useState({
        description: "Debo terminar mi proyecto del semaforo en react",
        author: "Luis J. Rodriguez O.",
        active: true,
        completed: false
    })

    useEffect(() => {
        getNotas();
    }, [])

    const getNotas = () => {
        fetch("http://localhost:4000/notas")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                //console.log(data)
                setNotas(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const addNota = (nota) => {
        fetch("http://localhost:4000/notas", {
            method: 'POST', // PUT
            body: JSON.stringify(nota),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        addNota(nota);
    }

    return (
        <>
            <div>App</div>
            <form onSubmit={handleSubmit}>
                <button>Añadir Nota</button>
            </form>
            <ul>
                {
                    !!notas &&
                        notas.length > 0 ?
                        notas.map((nota, index) => {
                            return (
                                <li key={index}>"{nota.description}" - <b>{nota.author}</b></li>
                            )
                        }) :
                        (
                            <li>Lista vacia</li>
                        )
                }
            </ul>
        </>
    )
}

export default App