use super::schema::posts;

#[derive(Queryable)]
pub struct Post {
    pub id:i32,
    pub name:String,
    pub body:String,
    pub email:Option<String>,
    pub hobby:Option<String>,
}


#[derive(Insertable)]
#[table_name="posts"]
pub struct NewPost<'a> {
    pub name: &'a str,
    pub body: &'a str,
    pub email: Option<&'a str>,
    pub hobby: Option<&'a str>,
}