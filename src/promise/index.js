
/**
 * Aqui la promesa se ejecuta al cargar el archivo
*/
const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve('Eyyy!!')
        } else {
            reject('Whoops :(')
        }
    })
}

somethingWillHappen()
    .then(response => console.log(response))
    .catch(reject => console.error(reject))

const somethingWillHappen2 = () => {
    return new Promise((res, rej) => {
        if (true) {
            setTimeout(() => {
                res("true")
            }, 2000)
        } else {
            const error = new Error('Whooop!')
            rej(error)
        }
    })
}

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.error(err))

/* 
 promesas encadenadas y 
 @return un arreglo de resultados
 @params arreglo de promesas
*/
Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => { 
        console.log('Array of results', response) 
    })
    .catch(err => console.error(err))