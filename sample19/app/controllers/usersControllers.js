const UserModel = require('../models/UserModel')

const usersList = async (req, res, next) => {
    try {
        let projection = {};
        if (req.query.fields) {
            projection = req.query.fields.split(",").reduce((total, current) => {
                return { [current]: 1, ...total }
            }, {})
        }

        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * perPage;

        const usersCount = await UserModel.find({}).countDocuments();
        const totalPage = Math.ceil(usersCount / perPage);

        const users = await UserModel.find({}, projection).skip(offset).limit(perPage);
        res.status(200).send({
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
    } catch (error) {
        next(error)
    }
}

const addUser = async (req, res, next) => {
    try {
        const newUser = new UserModel({
            first_name: 'arash',
            last_name: 'altafi',
            mobile: 9187677641,
            email: 'arashaltafi1377@gmail.com',
            create_at: new Date(1700991496324).getTime(),
            update_at: Date.now() - 36000
        })

        const { first_name, last_name, mobile, email } = req.body;
        if (first_name == undefined || first_name == "" || last_name == undefined || last_name == "") {
            return res.status(422).send({
                error: true,
                message: 'data input is not valid!'
            })
        }

        const newUser2 = new UserModel({
            first_name,
            last_name,
            mobile,
            email
        })

        await newUser2.save()

        res.status(201).send({
            success: true,
            message: 'user added successfully.',
            newUser2
        })
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            const user = await UserModel.findOne({ _id: id })
            if (!user) {
                res.status(404).send({
                    error: true,
                    message: 'user not found!'
                });
            } else {
                res.status(200).send({
                    success: true,
                    data: {
                        user
                    }
                });
            }
        } else {
            res.status(404).send({
                error: true,
                message: 'user not found!'
            });
        }
    } catch (error) {
        next(error)
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            await UserModel.deleteOne({ _id: id })
            res.status(200).send({
                success: true,
                message: 'user deleted successfully'
            });
        } else {
            res.status(404).send({
                error: true,
                message: 'user not found!'
            });
        }
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            const { n, nModified } = await UserModel.updateOne({ _id: id }, { ...req.body })
            if (n === 0 || nModified === 0) {
                throw new Error("update user has error")
            } else {
                res.status(200).send({
                    success: true,
                    message: 'user updated successfully',
                    data: {
                        updateUserResult
                    }
                });
            }
        } else {
            res.status(404).send({
                error: true,
                message: 'user not found!'
            });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    usersList, addUser, getUser, removeUser, updateUser
};