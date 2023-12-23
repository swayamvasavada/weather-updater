const db = require('../data/database');

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async subscribe() {
        const result = await db.getDb().collection('users').find({ userId: this.id }).toArray();

        if (result.length > 0) {
            return 'You\'ve already suscribed to weather updates';
        }

        await db.getDb().collection('users').insertOne({
            userId: this.id,
            name: this.name
        });

        return 'You\'ve successfully subscribed!';
    }

    async unsubscribe() {
        const result = await db.getDb().collection('users').find({ userId: this.id });

        if (!result) {
            return "You are already not a subscriber";
        }

        await db.getDb().collection('users').deleteOne({ userId: this.id });
        return "You're not a subscriber anymore!";
    }

    static async fetch() {
        const result = await db.getDb().collection('users').find({}, { projection: { _id: 0 ,userId: 1 } }).toArray();
        console.log(result);

        return result;
    }
}

module.exports = User;