
//assignment 1
const newBlogPost = {
    createdAt: "2022-03-22T10:36:37.176Z",
      title: "dicta",
      text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
      author: "Darren Abbott",
      id: "1",
}
db.posts.insertOne(newBlogPost)

db.posts.updateOne({
    title:"dicta"
},{$set:{
    title: "hojong"
}})

db.posts.find({
    title:'hojong'
})
  
  .limit(100)

  db.posts.deleteOne(newBlogPost)

//assignment 2

const getPosts = (limit, skip, sortField, sortOrder, filterField, filterValue) => {
    
    //Validation
    let dbLimit = limit
    if(!limit){
        dbLimit = 10
    }
    let dbSkip = skip
    if(!skip){
        dbSkip = 0
    }
    
    // const filterParam = {}
    
    // filterParam[filterField] = filterValue
    
    // console.log("filterParam ", filterParam)
    // same as
    // [filterField]: filter value
    
    //Expand this functionality
    let limits = limit
    let skips = skip
    let sortfield = sortField
    let sortorder = sortOrder
    let filterfield = filterField
    let filtervalue = filterValue
    
    const dbResult = db.posts.find({
        [filterfield]:filtervalue
    }).sort({[sortfield]:sortorder}).limit(limits).skip(skips).toArray()
    
    return dbResult
}

console.log(getPosts(50, 0, "createdAt", -1, "author", 'Levi Barton'))

//assignment 3
//optional change post id's from the string type to the number type
assert(parseFloat(db.version()) >= 4.2, "The pipeline parameters of the 'update' method need MongoDB Server 4.2 or plus.");

db.getCollection("posts").update(
    {},
    [{
        $set: {
            "id":
            {
                $convert: {
                    input: "$id",
                    to: "int", 
                }
            },
        }
    }],
    { multi: true }
)

//findPost(blogId)
const findPost = (blogId) => {

    const result = db.posts.find({
        id: blogId
    }).toArray()
    return result
}

console.log(findPost(10))
//getPostCollectionLength()
const getPostCollectionLength = () => {
    
    const result = db.posts.find({})
    
    return result.length()
}

console.log(getPostCollectionLength())
//makepost
const makePost = (blogId, title, text, author, category) => {
    let today = new Date()
    let lastModified = new Date()
    
    const newPost = db.posts.insertOne({
      createdAt: today,
      title: title,
      text: text,
      author: author,
      category: category,
      lastModified: lastModified,
      [blogId]: getPostCollectionLength() + 1
    })
    
    return newPost
}
console.log(makePost("id", 'me', 'work', 'hojong', 'test'))
//updatepost
const updatePost = (blogId, title, text, author, category) => {
    
    db.posts.updateOne(
        {id:blogId},{$set:{
        title:title,
        text: text,
        author: author,
        category: category,
        lastModified: new Date()
    }})
    
}
//deletePost

const deletePosts = (blogIds)=> {
    
    // const findId = db.posts.find({
    //     id:blogIds
    // }).toArray()
    
    const erasePost = db.posts.deleteMany({
        id: blogIds
    })
    
    return erasePost
}
console.log(deletePosts(51))