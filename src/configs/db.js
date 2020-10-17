import mongoose from 'mongoose'

export default () => {
    const host = process.env.DB_USER
        ? `${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        : `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

    const dbURL = `mongodb://${host}`

    mongoose.connect(dbURL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.Promise = global.Promise
    mongoose.connection.on('error', err => {
        // eslint-disable-next-line no-console
        console.log(`Could not connect to the database ${dbURL}. Exiting now...`)
        process.exit()
    })
}
