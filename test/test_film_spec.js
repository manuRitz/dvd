//var frisby = require('frisby');
//
//var url = 'http://localhost:8000/api';
//
//frisby.create('POST category for film test')
//    .post(url + '/category', {
//        category: 'Film Test Category',
//        shortcut: 'AA'
//    })
//    .expectStatus(200)
//    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//    .auth('test', 'test')
//    .expectJSONTypes('', {
//        id: String,
//        category: String,
//        shortcut: String
//    })
//    .expectJSON('', {
//        category: 'Film Test Category',
//        shortcut: 'AA'
//    })
//    .afterJSON(function (json_category) {
//
//        frisby.create('POST film')
//            .post(url + '/film', {
//                title: 'TEST FILM',
//                category: json_category.id,
//                number: 1
//
//            })
//            .expectStatus(200)
//            .expectHeader('Content-Type', 'application/json; charset=utf-8')
//            .auth('test', 'test')
//            .expectJSONTypes('', {
//                id: String,
//                title: String,
//                category: String,
//                number: Number
//            })
//            .expectJSON('', {
//                title: 'TEST FILM',
//                category: json_category.id,
//                number: 1
//            })
//            .afterJSON(function (json_film) {
//                frisby.create('GET films')
//                    .get(url + '/film')
//                    .expectStatus(200)
//                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//                    .expectJSONTypes('?', {
//                        id: String,
//                        title: String,
//                        category: String,
//                        number: Number
//                    })
//                    .expectJSON('?', {
//                        id: json_film.id,
//                        title: 'TEST FILM',
//                        category: json_category.id,
//                        number: 1
//                    })
//                    .toss();
//
//                frisby.create('GET film by id')
//                    .get(url + '/film/' + json_film.id)
//                    .expectStatus(200)
//                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//                    .expectJSONTypes('', {
//                        id: String,
//                        title: String,
//                        category: String,
//                        number: Number
//                    })
//                    .expectJSON('', {
//                        id: json_film.id,
//                        title: 'TEST FILM',
//                        category: json_category.id,
//                        number: 1
//                    })
//                    .toss();
//
//                frisby.create('POST category 2 for film test')
//                    .post(url + '/category', {
//                        category: 'Film Test Category 2',
//                        shortcut: 'BB'
//                    })
//                    .expectStatus(200)
//                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//                    .auth('test', 'test')
//                    .expectJSONTypes('', {
//                        id: String,
//                        category: String,
//                        shortcut: String
//                    })
//                    .expectJSON('', {
//                        category: 'Film Test Category 2',
//                        shortcut: 'BB'
//                    })
//                    .afterJSON(function (json_category2) {
//                        frisby.create('PUT film by id. Change title, category and number')
//                            .put(url + '/film/' + json_film.id, {
//                                title: 'TEST FILM 2',
//                                category: json_category2.id,
//                                number: 2
//                            })
//                            .expectStatus(200)
//                            .expectHeader('Content-Type', 'application/json; charset=utf-8')
//                            .auth('test', 'test')
//                            .expectJSONTypes('', {
//                                id: String,
//                                title: String,
//                                category: String,
//                                number: Number
//                            })
//                            .expectJSON('', {
//                                id: json_film.id,
//                                title: 'TEST FILM 2',
//                                category: json_category2.id,
//                                number: 2
//                            })
//                            .afterJSON(function (json) {
//                                frisby.create('DELETE film by id')
//                                    .delete(url + '/film/' + json_film.id)
//                                    .expectStatus(200)
//                                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//                                    .auth('test', 'test')
//                                    .expectJSONTypes('', {
//                                        success: Boolean
//                                    })
//                                    .expectJSON('', {
//                                        success: true
//                                    })
//                                    .afterJSON(function (json) {
//                                        frisby.create('DELETE category by id for film test')
//                                            .delete(url + '/category/' + json_category.id)
//                                            .expectStatus(200)
//                                            .expectHeader('Content-Type', 'application/json; charset=utf-8')
//                                            .auth('test', 'test')
//                                            .expectJSONTypes('', {
//                                                success: Boolean
//                                            })
//                                            .expectJSON('', {
//                                                success: true
//                                            })
//                                            .afterJSON(function (json) {
//                                                frisby.create('DELETE category 2 by id for film test')
//                                                    .delete(url + '/category/' + json_category2.id)
//                                                    .expectStatus(200)
//                                                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//                                                    .auth('test', 'test')
//                                                    .expectJSONTypes('', {
//                                                        success: Boolean
//                                                    })
//                                                    .expectJSON('', {
//                                                        success: true
//                                                    })
//                                                    .toss();
//                                            })
//                                            .toss();
//                                    })
//                                    .toss();
//                            })
//                            .toss();
//                    })
//                    .toss();
//            })
//            .toss();
//    })
//    .toss();
//
//frisby.create('error GET film by id')
//    .get(url + '/film/1111111111111111111111')
//    .expectStatus(400)
//    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//    .expectJSONTypes('', {
//        error: String
//    })
//    .expectJSON('', {
//        error: 'UNKNOWN_OBJECT'
//    })
//    .toss();
//
//frisby.create('error POST film missing title, category and number')
//    .post(url + '/film')
//    .expectStatus(400)
//    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//    .auth('test', 'test')
//    .expectJSONTypes('', {
//        error: String,
//        validation: {
//            title: String,
//            category: String,
//            number: String
//        }
//    })
//    .expectJSON('', {
//        error: 'VALIDATION_ERROR',
//        validation: {
//            title: 'MISSING',
//            category: 'MISSING',
//            number: 'MISSING'
//        }
//    })
//    .toss();
//
//frisby.create('error PUT film by false id ')
//    .put(url + '/film/111111111111111111111', {
//        number: 20
//    })
//    .expectStatus(400)
//    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//    .auth('test', 'test')
//    .expectJSONTypes('', {
//        error: String
//    })
//    .expectJSON('', {
//        error: 'UNKNOWN_OBJECT'
//    })
//    .toss();
//
//frisby.create('error DELETE film by false id ')
//    .delete(url + '/film/111111111111111111111')
//    .expectStatus(400)
//    .expectHeader('Content-Type', 'application/json; charset=utf-8')
//    .auth('test', 'test')
//    .expectJSONTypes('', {
//        error: String
//    })
//    .expectJSON('', {
//        error: 'UNKNOWN_OBJECT'
//    })
//    .toss();