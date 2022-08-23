const Mutation = {
    createUser(parent, args, { db }, info) {
        const userExist = db.users.some((user) => {
            return user.email === args.data.email
        })
        console.log("userCheck", userExist)
        if (userExist) {
            throw new Error('user already exist');
        }
        const newUser = {
            id: parseInt(Math.random() * 1000),
            ...args.data

        }
        console.log("new user", newUser)
        db.users.push(newUser);
        return newUser;

    },
    createPost(parent, args, { db, pubsub }, info) {
        const autherCheck = db.users.some((user) => user.id === args.post.auther);
        if (!autherCheck) {
            throw new Error("Provide valide autherId");
        }
        const newPostRecord = {
            id: Math.random(),
            publishedAt: new Date(),
            ...args.post
        }
        db.posts.push(newPostRecord);
        pubsub.publish('post', {
            post: {
                mutation: 'CREATED',
                data: newPostRecord
            }
        })
        return newPostRecord;

    },
    createComment(parent, args, { db, pubsub }, info) {
        const autherCheck = db.users.some((user) => user.id === args.commentPayload.auther);
        console.log("autherheck", autherCheck);

        if (!autherCheck) {
            throw new Error("invalid user trying to add comment.")
        }
        const validPostCheck = db.posts.some((post) =>
            post.id === args.commentPayload.post
        )
        console.log("validPostCheck", validPostCheck);
        if (!validPostCheck) {
            throw new Error(`Post with ${args.post} does not exist`);
        }
        const newCommentRecord = {
            id: Math.random(),
            text: args.commentPayload.text,
            autherOfTheComment: args.commentPayload.auther,
            post: args.commentPayload.post
        }
        db.comments.push(newCommentRecord);
        pubsub.publish(`comment ${args.commentPayload.post}`, {
            comment: {
                mutation: 'CREATED',
                data: newCommentRecord
            }
        });
        return newCommentRecord;
    },
    updateComment(parent, { id, text }, { db, pubsub }, info) {
        const commentMatch = db.comments.find((comment) => id === comment.id);
        if (!commentMatch) {
            throw new Error('invalid comment id')
        }
        if (typeof text === 'string') {
            commentMatch.text = text
        }
        pubsub.publish(`comment ${commentMatch.post}`, {
            comment: {
                mutation: 'DELETED',
                data: commentMatch
            }
        })
        return commentMatch
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found')
        }

        const deletedUsers = db.users.splice(userIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.auther === args.id

            if (match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match
        })
        db.comments = db.comments.filter((comment) => comment.autherOfTheComment !== args.id)

        return deletedUsers[0]
    },

    deletePost(parent, args, { db, pubsub }, info) {
        const postMatch = db.posts.findIndex((post) =>
            post.id === args.postId);

        if (postMatch === -1) {
            throw new Error(`post with ${args.postId} don't exist`);
        }
        const deletedPost = db.posts.splice(postMatch, 1);

        db.comments = db.comments.filter((comment) => comment.post !== args.postId);
        pubsub.publish('post', {
            post: {
                mutation: "DELETED",
                data: deletedPost[0]
            }
        })
        return deletedPost[0];
    },
    deleteComment(parent, args, { db, pubsub }, info) {
        const commentMAtch = db.comments.findIndex((comment) => comment.id === args.commentId);
        console.log("comentMAtc", commentMAtch);
        if (commentMAtch === -1) {
            throw new Error("invalid commentId")
        }
        const deletedComment = db.comments.splice(commentMAtch, 1);
        pubsub.publish(`comment ${deletedComment[0].post}`, {
            comment: {
                mutation: 'DELETED',
                data: deletedComment[0]
            }
        });
        return deletedComment[0];

    },
    updateUser(parent, args, { db }, info) {
        try {
            const { id, data } = args
            console.log({ id: id, data: data })
            const user = db.users.find((user) => user.id === id)
            console.log("user", user)

            if (!user) {
                throw new Error("invalid user")
            }
            if (typeof data.email === 'string') {
                const emailTaken = db.users.some((user) => user.email === data.email)
                if (emailTaken) {
                    throw new Error("email already taken");
                }
                user.email = data.email;

            }
            if (typeof data.name === 'string') {
                user.name = data.name;
            }
            if (typeof data.age !== 'undefine') {
                user.age = data.age
            }
            return user
        }
        catch (err) {
            console.log({ err: err })
            throw new Error({ err: err })
        }
    }

}

export { Mutation as default };