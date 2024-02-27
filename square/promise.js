export default await new Promise((resolve, reject) => {
    console.log('timeout started')
    setTimeout(() => {
        console.log('timeout finished')
        if (Boolean(Number(new Date().getSeconds()) % 2)) {
            resolve('success')
        } else {
            reject('error')
        }
    }, 2000)
})

