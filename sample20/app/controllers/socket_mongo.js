const { ObjectId } = require('mongodb');
const connectToMongo = require('../boot/mongo');

module.exports = (socket, io) => {
    console.log('A user connected', socket.id);

    socket.on('create_mongo', async (data) => {
        try {
            const { first_name, last_name, mobile, email } = data.data;

            if (
                first_name == undefined || first_name == "" ||
                last_name == undefined || last_name == "" ||
                mobile == undefined || mobile == "" ||
                email == undefined || email == ""
            ) {
                io.emit('create_mongo', {
                    error: true,
                    message: 'data input is not valid!'
                });
            } else {
                console.log(data.event);
                const db = await connectToMongo();
                const collection = db.collection('users');
                await collection.insertOne({
                    first_name,
                    last_name,
                    mobile,
                    email
                });
                io.emit('create_mongo', {
                    first_name,
                    last_name,
                    mobile,
                    email
                });
            }
        } catch (error) {
            console.error('Mongo create error:', error);
        }
    });

    socket.on('read_mongo', async (data) => {
        const perPage = data.data.perPage || 10;
        const page = data.data.page || 1;
        const offset = (page - 1) * perPage;

        try {
            const db = await connectToMongo();
            const collection = db.collection('users');

            const rows = await collection.find({}).toArray()
            const usersCount = rows.length;
            const totalPage = Math.ceil(usersCount / perPage);

            const result = await collection
                .find({}, { _id: 0, first_name: 1, last_name: 1, mobile: 1, email: 1 })
                .skip(offset)
                .limit(perPage)
                .toArray();

            console.log(data.event);

            io.emit('read_mongo', {
                success: true,
                message: 'users list successfully created!!!',
                data: {
                    result
                },
                meta: {
                    totalCount: usersCount,
                    pages: totalPage,
                    next: `${process.env.APP_URL}/api/v1/users?page=${Number(page) + 1}`
                }
            });

        } catch (error) {
            console.error('Mongo read error:', error);
            io.emit('read_mongo', error.message);
        }
    });

    socket.on('update_mongo', async (data) => {
        const id = data.data._id
        const firstName = data.data.first_name;

        if (id && firstName !== '' && firstName !== undefined) {
            console.log(data.event);
            const db = await connectToMongo();
            const collection = db.collection('users');
            await collection.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: {
                    first_name: firstName
                }
            });

            io.emit('update_mongo', {
                code: 200,
                success: true,
                message: 'user updated successfully',
            });
        } else {
            io.emit('update_mongo', {
                code: 404,
                error: true,
                message: 'user not found!'
            });
        }
    });

    socket.on('delete_mongo', async (data) => {
        const id = data.data.id

        if (id !== '' && id !== undefined) {
            const db = await connectToMongo();
            const collection = db.collection('users');
            await collection.deleteOne({
                _id: new ObjectId(id)
            });

            console.log(data.event);
            io.emit('delete_mongo', {
                success: true,
                message: 'user deleted successfully'
            });
        } else {
            io.emit('delete_mongo', {
                code: 404,
                error: true,
                message: 'user not found!'
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
}