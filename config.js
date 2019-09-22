let server = 'localhost:27017'
let db = 'dragon'

module.exports ={
    port: process.env.PORT || 3333,
    db: process.env.MONGODB || `mongodb://${server}/${db}`
}