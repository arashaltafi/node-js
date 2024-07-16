const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { studentData, teacherData } = require('./data');

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
    },
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
        }
    }
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
        teachers: {
            type: new GraphQLList(teacherType),
            resolve: () => {
                return teacherData
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: rootQuery
});

module.exports = {
    schema
}