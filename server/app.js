const {graphqlHTTP} = require('express-graphql');
const express = require('express');
const schema = require('./schema');
const cors = require('cors');

const users = [{id: 1, username: "Kyrylo", age: 25}];

const app = express();

app.use(cors());

const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
};

const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({id}) => {
        return users.find(user => user.id === id);
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user);
        return user;
    }
};

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}));

const port = 4000;

app.listen(port, () => console.log(`server started on port ${port}`));
