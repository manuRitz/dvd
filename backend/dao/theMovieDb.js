var _ = require('lodash');

class TheMovieDb {
    constructor(restClient, key) {
        this.restClient = restClient;
        this.key = key;
    }

    searchTitle(title) {
        return this.restClient.get(`/3/search/multi?api_key=${this.key}&query=${title}&language=de&page=1`)
            .then((res) => {
                var films = [];
                res.results.forEach((film) => {
                    if(film.id && film.title) {
                        films.push({
                            id: film.id,
                            title: film.title,
                            poster_path: film.poster_path
                        });
                    }
                });
                return films;
            });
    }
}

module.exports = TheMovieDb;