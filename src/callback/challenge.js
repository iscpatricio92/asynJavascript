/* Instanciamos la dependencia con require() */
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/'

function fetchData(url_api, callback) {
    // Referencia del objeto que necesitamos.
    let xhttp = new XMLHttpRequest()

    /* Hacemos un llamado a una url */
    xhttp.open('GET', url_api, true)
    // El último parámetro hace referencia al asincronismo. Por defecto es true, pero lo ponemos para referencia.
    /* 'Escuchamos' lo que hará la conexión (Referente a los 5 estados que comenta el profesor) */
    xhttp.onreadystatechange = function (event) {
        if (xhttp.readyState === 4) { // Validar si la petición se completó. (Estado 5 pero contamos desde 0 como en un array)
            if (xhttp.status === 200) { // Validar el estado en el que se encuentra la petición. (200 = todo bien, 400 = no encontró algo, 500 = error en el servidor)
                /* Regresar el callback (primer valor que pasamos es el error y el segundo es el resultado del llamado a la API) */
                callback(null, JSON.parse(xhttp.responseText)) //primer valor del callback dentro de node es el error (se deja error en null), luego el resultado del llamado a la Api. Parsear el JSON 
            } else {        //mandar a llamar a error cuando no suceda todo correctamente
                const error = new Error('Error' + url_api) //creacion de la constate error la cual genera un objeto error que contiene un string Error y la url de la api
                return callback(error, null)        //retornar el collback ahora si pasando el objeto error antes creado para que me lo muestre.
            }
        }
    }
    xhttp.send()
}

// primero buscamos la lista de personajes
fetchData(API, function (error1, data1) {
    // si error, matamos retornando un error
    if (error1) return console.error('Error 1' + error1)
    // luego buscamos en la api el id de Rick
    fetchData(API + data1.results[0].id, function (error2, data2) {
        // si error, matamos retornando un error
        if (error2) return console.error('Error 2' + error2)
        // por ultimo la consulta a la api que contiene su dimension
        fetchData(data2.origin.url, function (error3, data3) {
            // si error, matamos retornando un error
            if (error3) return console.error('Error 3: ' + error3);
            // mostramos los resultados :) 
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);

            // rutas de las peticiones en orden
            console.log(API);
            console.log(API + data1.results[0].id);
            console.log(data2.origin.url);
        })
    })
})