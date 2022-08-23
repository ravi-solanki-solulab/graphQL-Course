import { GraphQLServer, PubSub } from 'graphql-yoga'
import  db  from './db'
import Query  from './resolvers/Query';
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription';
import User  from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

// scaler type ID, string ,  int , float , boolean 
//type defination

//demo scaler array 
// const scallerAray = [1, 2, 3, 4, 5];
const pubsub =  new PubSub();

//resolvers
const resolver = {
    Mutation: Mutation,
    Subscription:Subscription,
    Query: Query ,
    Post: Post ,
    User: User,
    Comment: Comment
};

const server = new GraphQLServer(
    {
        typeDefs:'./src/schema.graphql',
        resolvers: resolver,
      
        context: {
            db,
            pubsub
        }

    });

server.start(() => {
    console.log("graphql server is running");
});