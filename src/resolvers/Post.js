
const Post = {
    auther(parent, args, { db }, inf) {
        return db.users.find((user) => {
            return user.id === parent.auther
        })
    },
    comments(parent, args,{ db }, info) {
        console.log("comments in resolver", parent.comments)
        if (parent.comments) {
            return db.comments.filter((comment) => {
                console.log("check", parent.comments.includes(comment.id))
                return parent.comments.includes(comment.id);
            })
        }
    }
}

export { Post as default };