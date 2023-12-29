const ObjectId = require('mongodb').ObjectId;
const db = require('../data/database');

class User {
    constructor(id) {
        this.id = id;
    }

    async subscribe(name) {
        const result = await db.getDb().collection('users').find({ userId: this.id }).toArray();

        if (result.length > 0) {
            return 'You\'ve already suscribed to weather updates';
        }

        await db.getDb().collection('users').insertOne({
            userId: this.id,
            name: name,
            blocked: false
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
        const result = await db.getDb().collection('users').find({}).toArray();

        return result;
    }

    async block() {
        const result = await db.getDb().collection('users').updateOne({ _id: new ObjectId(this.id) }, { $set: { blocked: true } });

        return result;
    }

    async unblock() {
        const result = await db.getDb().collection('users').updateOne({ _id: new ObjectId(this.id) }, { $set: { blocked: false } });

        return result;
    }

    async delete() {
        const result = await db.getDb().collection('users').deleteOne({ _id: new ObjectId(this.id) });
        return result;
    }
}

module.exports = User;