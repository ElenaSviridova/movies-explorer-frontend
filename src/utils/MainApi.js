export default class Api {
    constructor({adress, token}) {
        this._adress = adress;
        this._token = token;
    }

    _getResponseData(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка ${response.status}`))
    }

    getProfileInfo() {
        return fetch(`${this._adress}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        }).then(this._getResponseData)
    }

    changeProfileInfo(profileName, profileEmail) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              name: profileName,
              email: profileEmail
            })
        })
        .then(this._getResponseData)
    }

    getSavedMovies() {
        return  fetch(`${this._adress}/movies`,{
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-type': 'application/json'
            }
        }).then(this._getResponseData)
    }
    
    saveMovie(data) {
        return fetch(`${this._adress}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description, 
                image: data.image, 
                trailer: data.trailer, 
                nameRU: data.nameRU, 
                nameEN:  data.nameEN,
                thumbnail: data.thumbnail,
                movieId: data.id 
            })
        })
        .then(this._getResponseData)
    }

    removeMovie(id) {
        return  fetch(`${this._adress}/movies/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        })
        .then(this._getResponseData)  
    }
}



// export default mainApi