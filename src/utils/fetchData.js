/* Instanciamos la dependencia con require() */
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        // Referencia del objeto que necesitamos.
        let xhttp = new XMLHttpRequest()

        /* Hacemos un llamado a una url */
        xhttp.open('GET', url_api, true)
        // El último parámetro hace referencia al asincronismo. Por defecto es true, pero lo ponemos para referencia.
        /* 'Escuchamos' lo que hará la conexión (Referente a los 5 estados que comenta el profesor) */
        xhttp.onreadystatechange = (() => {
            if (xhttp.readyState === 4) { // Validar si la petición se completó. (Estado 5 pero contamos desde 0 como en un array)
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error', url_api))
            }
        }
        )
        xhttp.send()
    })
}

module.exports = fetchData;