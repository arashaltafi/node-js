const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { studentData, teacherData, courseData } = require('./data');

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
    name: 'Root',
    fields: {
        students: {
            type: new GraphQLList(studentType),
            resolve: () => {
                return studentData
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
            resolve: () => {
                return teacherData
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
            resolve: () => {
                return courseData
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

const schema = new GraphQLSchema({
    query: rootQuery
});

module.exports = {
    schema
}