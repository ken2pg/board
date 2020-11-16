use super::schema::posts;
use askama::Template;
use thiserror::Error;
use serde::{Deserialize,Serialize};
use actix_web::ResponseError;

#[derive(Queryable)]
#[derive(Debug)]
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

#[derive(Template)]
#[template(path="index.html")]
pub struct PostTemplate{
    pub comments:Vec<Post>,
}

#[derive(Serialize, Deserialize)]
pub struct Add {
    pub text:String,
}

#[derive(Debug,Error)]
pub enum WebError
{
    #[error("Failed!")]
    AskamaError(#[from]askama::Error),
}

impl ResponseError for WebError {}//serviceにわたす関数の返り値はResponse Errorトレイトを実装している必要がある。