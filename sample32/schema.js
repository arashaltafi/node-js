const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { studentData, teacherData, courseData } = require('./data');

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
            resolve: () => {
                return courseData
            }
        }
    }
})

const studentType = new GraphQLObjectType({
    name: 'Student',
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
        age: {
            type: GraphQLInt
        },
        teacher: {
            type: teacherType,
            resolve: (obj) => {
                console.log('obj:', obj)
                return teacherData.find(teacher => teacher.id === obj.id)
            }
        }
    },
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        students: {
            type: new GraphQLList(studentType),
            resolve: async () => {
                return await studentModel.find({})
            }
        },
        student: {
            type: studentType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (obj, args) => {
                console.log('args:', args)
                return studentData.find(student => student.id === args.id);
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
                    type: GraphQLInt
                }
            },
            resolve: (obj, args) => {
                console.log('obj:', obj)
                console.log('args:', args)
                return teacherData.find(teacher => teacher.id === args.id);
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
            resolve: (obj, args) => {
                console.log('obj:', obj)
                console.log('args:', args)
                return courseData.find(course => course.id === args.id)
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