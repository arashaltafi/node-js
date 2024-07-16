const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');

const courseModel = require('./models/Course')
const teacherModel = require('./models/Teacher')
const studentModel = require('./models/Student')

const courseType = new GraphQLObjectType({
    name: 'Course',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        price: {
            type: GraphQLInt
        }
    }
})

const teacherType = new GraphQLObjectType({
    name: 'Teacher',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        family: {
            type: GraphQLString
        },
        class: {
            type: GraphQLString
        },
        courses: {
            type: new GraphQLList(courseType),
            resolve: async () => {
                const courses = await courseModel.find({})
                return courses
            }
        }
    }
})

const studentType = new GraphQLObjectType({
    name: 'Student',
    fields: {
        id: {
            type: GraphQLInt,
            description: 'student id'
        },
        name: {
            type: GraphQLString,
            description: 'student name'
        },
        family: {
            type: GraphQLString,
            description: 'student family'
        },
        age: {
            type: GraphQLInt,
            description: 'student age'
        },
        teacher: {
            type: teacherType,
            resolve: async (obj) => {
                const teacher = await teacherModel.findOne({ _id: obj.teacher })
                return teacher
            }
        }
    },
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        students: {
            type: new GraphQLList(studentType),
            args: {
                page: {
                    type: GraphQLInt
                },
                page_size: {
                    type: GraphQLInt
                }
            },
            resolve: async (obj, args, context) => {
                console.log('token:', context.token)
                console.log('theme:', context.theme)
                const page = args.page || 1
                const pageSize = args.page_size || 10
                return await studentModel.find({}).skip((page - 1) * pageSize).limit(pageSize)
            }
        },
        student: {
            type: studentType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: async (obj, args) => {
                return await studentModel.findOne({ _id: args.id });
            }
        },
        teachers: {
            type: new GraphQLList(teacherType),
            resolve: async () => {
                return await teacherModel.find({})
            }
        },
        teacher: {
            type: teacherType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: async (obj, args) => {
                return await teacherModel.findOne({ _id: args.id });
            }
        },
        courses: {
            type: new GraphQLList(courseType),
            resolve: async () => {
                return await courseModel.find({})
            }
        },
        course: {
            type: courseType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: async (obj, args) => {
                return await courseModel.findOne({ _id: args.id });
            }
        },
    }
})

const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addTeacher: {
            type: teacherType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                family: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                class: {
                    type: GraphQLString
                }
            },
            resolve: async (obj, args) => {
                const newTeacher = {
                    id: args.id,
                    name: args.name,
                    family: args.family,
                    class: args.class
                };
                return await teacherModel.create(newTeacher)
            }
        },
        addStudent: {
            type: studentType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                family: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                teacher: {
                    type: GraphQLID
                }
            },
            resolve: async (obj, args) => {
                const newStudent = {
                    id: args.id,
                    name: args.name,
                    family: args.family,
                    age: args.age,
                    teacher: args.teacher
                }
                return await studentModel.create(newStudent)
            }
        },
        addCourse: {
            type: courseType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                price: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (obj, args) => {
                const newCourse = {
                    id: args.id,
                    name: args.name,
                    price: args.price
                }
                return await courseModel.create(newCourse)
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});

module.exports = {
    schema
}