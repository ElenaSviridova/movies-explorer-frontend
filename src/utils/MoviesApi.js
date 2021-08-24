export class Api {
    constructor({adress, token}) {
        this._adress = adress;
        // this._token = token;
    }

    _getResponseData(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка ${response.status}`))
    }

    getMovies() {
        return  fetch(`${this._adress}/`,{
            headers: {
                // authorization: this._token
            },
        }).then(this._getResponseData)
    }

}

const moviesApi = new Api({adress: 'https://api.nomoreparties.co/beatfilm-movies'});

export default moviesApi