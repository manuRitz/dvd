var frisby = require('frisby');

var url = 'http://localhost:8000/api';

frisby.create('POST category')
    .post(url + '/category', {
        shortcut: 'TT',
        category: 'TEST'

    })
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    //.auth('test', 'test')
    .expectJSONTypes('', {
        id: String,
        category: String,
        shortcut: String
    })
    .expectJSON('', {
        category: 'TEST',
        shortcut: 'TT'
    })
    .afterJSON(function (json) {
        frisby.create('GET categories')
            .get(url + '/category')
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSONTypes('?', {
                id: String,
                category: String,
                shortcut: String
            })
            .expectJSON('?', {
                id: json.id,
                category: 'TEST',
                shortcut: 'TT'
            })
            .toss();

        frisby.create('GET category by id')
            .get(url + '/category/' + json.id)
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSONTypes('', {
                id: String,
                category: String,
                shortcut: String
            })
            .expectJSON('', {
                id: json.id,
                category: 'TEST',
                shortcut: 'TT'
            })
            .toss();

        frisby.create('PUT category by id')
            .put(url + '/category/' + json.id, {
                shortcut: 'T'
            })
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            //.auth('test', 'test')
            .expectJSONTypes('', {
                id: String,
                category: String,
                shortcut: String
            })
            .expectJSON('', {
                id: json.id,
                category: 'TEST',
                shortcut: 'T'
            })
            .afterJSON(function (json) {
                frisby.create('DELETE category by id')
                    .delete(url + '/category/' + json.id)
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    //.auth('test', 'test')
                    .expectJSONTypes('', {
                        id: String,
                        category: String,
                        shortcut: String
                    })
                    .expectJSON('', {
                        id: json.id,
                        category: 'TEST',
                        shortcut: 'T'
                    })
                    .toss();
            })
            .toss();
    })
    .toss();

frisby.create('error GET category by id')
    .get(url + '/category/1111111111111111111111')
    .expectStatus(404)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('', {
        error: String
    })
    .expectJSON('', {
        error: 'NOT_FOUND'
    })
    .toss();

frisby.create('error POST category missing category and shortcut')
    .post(url + '/category')
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .auth('test', 'test')
    .expectJSONTypes('', {
        error: String,
        validation: {
            category: String,
            shortcut: String
        }
    })
    .expectJSON('', {
        error: 'VALIDATION_ERROR',
        validation: {
            category: 'MISSING',
            shortcut: 'MISSING'
        }
    })
    .toss();

frisby.create('error POST category invalid shortcut. Not length of 2 or lower.')
    .post(url + '/category', {
        category: 'shortcut not length of 2 or lower',
        shortcut: 'AAA'
    })
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .auth('test', 'test')
    .expectJSONTypes('', {
        error: String,
        validation: {
            shortcut: String
        }
    })
    .expectJSON('', {
        error: 'VALIDATION_ERROR',
        validation: {
            shortcut: 'INVALID'
        }
    })
    .toss();

frisby.create('error POST category invalid shortcut. Only letters')
    .post(url + '/category', {
        category: 'shortcut not length of 2 or lower',
        shortcut: '4a'
    })
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .auth('test', 'test')
    .expectJSONTypes('', {
        error: String,
        validation: {
            shortcut: String
        }
    })
    .expectJSON('', {
        error: 'VALIDATION_ERROR',
        validation: {
            shortcut: 'INVALID'
        }
    })
    .toss();

frisby.create('POST category for error POST category duplicated test')
    .post(url + '/category', {
        category: 'DUPLICATED TEST',
        shortcut: 'DD'
    })
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    //.auth('test', 'test')
    .expectJSONTypes('', {
        id: String,
        category: String,
        shortcut: String
    })
    .expectJSON('', {
        category: 'DUPLICATED TEST',
        shortcut: 'DD'
    })
    //.inspectJSON()
    .afterJSON(function (json_category) {
        frisby.create('error POST category duplicated')
            .post(url + '/category', {
                category: 'DUPLICATED TEST',
                shortcut: 'DD'
            })
            .expectStatus(404)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            //.auth('test', 'test')
            .expectJSONTypes('', {
                error: String,
                validation: String
            })
            .expectJSON('', {
                error: 'VALIDATION_ERROR',
                validation: 'DUPLICATED'
            })
            .afterJSON(function (json) {
                frisby.create('DELETE category for error POST category duplicated test')
                    .delete(url + '/category/' + json_category.id)
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    //.auth('test', 'test')
                    .expectJSONTypes('', {
                        id: String,
                        category: String,
                        shortcut: String
                    })
                    .expectJSON('', {
                        id: json.id,
                        category: 'DUPLICATED TEST',
                        shortcut: 'DD'
                    });
            })
            .toss();
    })
    .toss();

frisby.create('error PUT category by false id ')
    .put(url + '/category/111111111111111111111', {
        shortcut: 'AA'
    })
    .expectStatus(404)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .auth('test', 'test')
    .expectJSONTypes('', {
        error: String
    })
    .expectJSON('', {
        error: 'NOT_FOUND'
    })
    .toss();

frisby.create('error DELETE category by false id ')
    .delete(url + '/category/111111111111111111111')
    .expectStatus(404)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .auth('test', 'test')
    .expectJSONTypes('', {
        error: String
    })
    .expectJSON('', {
        error: 'NOT_FOUND'
    })
    .toss();