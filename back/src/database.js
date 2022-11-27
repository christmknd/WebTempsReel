import pg from "pg";
const { Client } = pg

const connectDb = async () => {
    try {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.PORT_POSTGRES
    })
    
    await client.connect()
    console.log("DB Connected!");
    await client.end()
    } catch (error) {
    console.log(error)
    }
}

export default connectDb;