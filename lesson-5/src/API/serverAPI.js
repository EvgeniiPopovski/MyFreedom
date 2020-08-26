const serverAPI = {
    async getFilms() {
        let response = await fetch('http://localhost:3004/films')
        let films = await response.json()
        if (response.ok) {
            return films
        } else {
            throw new Error('Произошла ошибка при загрузке списка фильмов')
        }
    },

    async addFilms(film) {
        let response = await fetch('http://localhost:3004/films', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(film)
        })
        let respomeItem = await response.json()
        console.log(respomeItem)
        if (response.ok) {
            return respomeItem
        } else {
            throw new Error('Произошла ошибка при сохранении фильма')
        }
    },

    async editFilm(film) {
        let response = await fetch(`http://localhost:3004/films/${film.id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(film)
        })
        if (response.ok) {
            return response
        } else {
            throw new Error('Произошла ошибка при редактировании фильма')
        }
    },

    async deleteFilm(id) {
        let response = await fetch(`http://localhost:3004/films/${id}`, { method: "DELETE" })
        if (response.ok) {
            return response
        } else {
            throw new Error('Произошла ошибка при удалении фильма')
        }
    }
}




export { serverAPI }