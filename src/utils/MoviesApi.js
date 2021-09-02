export class Api {
    constructor({adress}) {
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
                
            },
        }).then(this._getResponseData)
    }

}

const moviesApi = new Api({adress: 'https://api.nomoreparties.co/beatfilm-movies'});

export default moviesApi