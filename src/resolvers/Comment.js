const Comment = {
    autherOfTheComment(parent, args, { db }, info) {
        return db.users.find((user) => {
            return user.id === parent.autherOfTheComment;
        })
    },
    
    post(parent, args, { db }, info) {

        return db.posts.find((post) => {
            console.log("parent", parent)
            console.log('post')
            return post.id === parent.post
        })
    }
}

export { Comment as default };