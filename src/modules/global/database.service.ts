import mongoose from 'mongoose'

const connections = new Map<string, Promise<mongoose.Connection>>()

export function setConnection(namespace, uri): void {
    try {
        connections.set(namespace, mongoose.createConnection(uri, {
            dbName: namespace
        }).asPromise())
    } catch(error) {
        console.log(error)
        //X-Ray
    }
}

export const DatabaseService = [
    {
        provide: 'DBConnections',
        useFactory: (): Map<string, Promise<mongoose.Connection>> => {
            return connections
        }
    }
]