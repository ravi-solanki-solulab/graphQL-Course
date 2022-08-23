const posts = [
    {

        id: "12345xyz",
        title: "moon",
        body: "moon is in the sky",
        publishedAt: new Date(),
        auther: "12abc",
        comments: ["1", "3"]
    },
    {

        id: "12345xya",
        title: "sun",
        body: "sun is of yellow color",
        publishedAt: new Date(),
        auther: "12abd",
        comments: ["2"]
    },
    {

        id: "12345pqr",
        title: "lion",
        body: "lion is a wild animal",
        publishedAt: new Date(),
        auther: "12abe"
    }
]
//demo users
const users = [

    {
        id: "12abc",
        name: "ravi",
        email: "ra@Gmil.com",
        age: 25,
        comments: ["1", "2"]
    },
    {
        id: "12abd",
        name: "raj",
        email: "raj@Gmil.com",
        comments: ["3"]
    },
    {
        id: "12abe",
        name: "jay",
        email: "jay@Gmil.com"
    }
]

//demo comments
const comments = [
    {
        id: "1",
        text: "1st comment",
        autherOfTheComment: "12abc",
        post: "12345xyz",

    },
    {
        id: "2",
        text: "2nd comment",
        autherOfTheComment: "12abc",
        post: "12345xya",

    }
    , {
        id: "3",
        text: "3rd comment",
        autherOfTheComment: "12abe",
        post: "12345pqr"
    }
]

const db =  {  users, comments, posts}

export { db as default };