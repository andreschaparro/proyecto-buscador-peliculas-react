import { useState } from "react"

export const BuscadorPeliculas = () => {

    const API_KEY = 'd02ee54cac59ef38987b3910925698de'
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const urlImg = 'https://image.tmdb.org/t/p/w200'

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (event) => {
        setBusqueda(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (busqueda.length > 0) {
            fetchPelicula()
        }
    }

    const fetchPelicula = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error)
        }
    }

    return (
        <div className="container custom-container mt-3 p-3">
            <h1 className="text-center mb-3">Buscador de Películas con React</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el título de una película"
                        value={busqueda}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="btn btn-success">Buscar</button>
                </div>

                <div className="d-flex flex-wrap">
                    {
                        peliculas.map((pelicula) => (
                            <div class="col-12 col-md-4 p-2">
                                <div className="card h-100" key={pelicula.id}>
                                    <img className="card-img-top" src={`${urlImg}${pelicula.poster_path}`} alt={pelicula.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{pelicula.title}</h5>
                                        <p className="card-text">{pelicula.overview}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </form>

        </div>

    )
}
