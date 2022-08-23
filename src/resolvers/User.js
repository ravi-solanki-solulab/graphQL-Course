const User = {
    posts(parent, args, { db} , info) {
        return db.posts.filter((post) => {
            return post.auther === parent.id;
        })
    },

    comments(parent, args, { db }, info) {
        if (parent.comments) {
            return db.comments.filter((comment) => {
                return parent.comments.includes(comment.id);
            })
        }

    }


}

export { User as default }