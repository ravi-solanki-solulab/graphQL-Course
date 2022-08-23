const Query =  {
    scalerArray() {
        return scallerAray
    },

    me() {
        return {
            id: "12abc",
            name: "ravi",
            email: "ra@Gmil.com"
        }
    },

    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter((post) => {
            const isTitleMAtch = post.title.includes(args.query)
            const isBodyMatch = post.body.includes(args.query);
            return isTitleMAtch || isBodyMatch;
        })
    },

    users(parent, args, {db}, info) {
        if (!args.query) 
        {
            return db.users
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        })


    },

    comments(parent, args, { db }, info) {
        return db.comments;
    }
}

export { Query as default };