use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use dotenv::dotenv;
use std::env;
use super::models::{Post,NewPost};
use super::schema::posts;

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

/*
                CRUD
*/

pub fn create_post<'a>(conn: &SqliteConnection,name: &'a str,body: &'a str,hobby:Option<&'a str> ,email:Option<&'a str> ) {

    let new_post = NewPost {
        name: name,
        body: body,
        hobby: hobby,
        email: email,
    };

    diesel::insert_into(posts::table)
        .values(&new_post)
        .execute(conn)
        .expect("Error saving new post");
}


pub fn read_post(conn: &SqliteConnection,number :i64)
{
    use super::schema::posts::dsl::*;

    let results = posts.limit(number)
    .load::<Post>(conn)// result into Post
    .expect("Error loading posts");

    println!("Taking {} posts!", results.len());

    for post in results {
        println!("hobby:{}", post.body);
        println!("email:{}", post.body);
        println!("name:{}", post.name);
        println!("body:{}", post.body);
    }
}

/*
pub fn update_post<'a>(conn: &SqliteConnection,id: i32,new_body:&'a str ) {
    diesel::update(posts.find(id))
        .set()
        .values(&new_post)
        .execute(conn)
        .expect("Error saving new post");
}
*/


/*
pub fn update_post<'a>(conn: &SqliteConnection,id: i32,new_body:&'a str ) {
pub fn delete_post(conn: &SqliteConnection,delete_id :i64)
{
    use super::schema::posts::dsl::*;

    diesel::delete(posts.find(id.filter(|i|i==delete_id)))
        .execute(conn)
        .expect("Error deleting posts");
}
*/