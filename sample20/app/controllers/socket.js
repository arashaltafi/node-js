const mysql = require('../boot/mysql');

module.exports = (socket, io) => {
    console.log('A user connected', socket.id);

    socket.on('create', async (data) => {
        try {
            const { first_name, last_name, mobile, email } = data.data;

            if (
                first_name == undefined || first_name == "" ||
                last_name == undefined || last_name == "" ||
                mobile == undefined || mobile == "" ||
                email == undefined || email == ""
            ) {
                io.emit('create', {
                    error: true,
                    message: 'data input is not valid!'
                });
            } else {
                console.log(data.event);
                await mysql.query('INSERT INTO users SET ?', data.data)
                io.emit('create', data.data);
            }
        } catch (error) {
            console.error('MySQL create error:', error);
        }
    });

    socket.on('read', async (data) => {
        const perPage = data.data.perPage || 10;
        const page = data.data.page || 1;
        const offset = (page - 1) * perPage;

        const [rows, _] = await mysql.query(`SELECT * FROM users`);

        const usersCount = rows.length;
        const totalPage = Math.ceil(usersCount / perPage);

        const p = mysql.query(`SELECT * FROM users LIMIT ${perPage} OFFSET ${offset}`)
        p.then(([users, fields]) => {
            console.log(data.event);
            io.emit('read', {
                success: true,
                message: 'users list successfully created!!!',
                data: {
                    users
                },
                meta: {
                    totalCount: usersCount,
                    pages: totalPage,
                    next: `${process.env.APP_URL}/api/v1/users?page=${Number(page) + 1}`
                }
            });
        }).catch(error => {
            console.error('MySQL read error:', error);
            io.emit('read', error.message);
        }).finally();
    });

    socket.on('update', async (data) => {
        const id = data.data.id
        const firstName = data.data.first_name;
        console.log(data.event);

        if (id && firstName !== '' && firstName !== undefined) {
            await mysql.query("UPDATE users SET first_name = ? WHERE id = ?", [firstName, id])
            io.emit('update', {
                code: 200,
                success: true,
                message: 'user updated successfully',
            });
        } else {
            io.emit('update', {
                code: 404,
                error: true,
                message: 'user not found!'
            });
        }
    });

    socket.on('delete', async (data) => {
        const id = data.data.id
        const condition = {
            id: id
        };

        if (id !== '' && id !== undefined) {
            await mysql.query("DELETE FROM users WHERE ?", condition)

            console.log(data.event);
            io.emit('delete', {
                success: true,
                message: 'user deleted successfully'
            });
        } else {
            io.emit('delete', {
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