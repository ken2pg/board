extern crate board;
extern crate diesel;

use actix_web::{http::header,post,get,web,App,HttpResponse,HttpServer,ResponseError};
use askama::Template;
use thiserror::Error;

use self::diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use board::db_operations::*;
use board::models::Post;


#[derive(Template)]
#[template(path="index.html")]
struct PostTemplate{
    comments:Vec<Post>,
}

#[derive(Debug,Error)]
enum WebError
{
    #[error("Failed!")]
    AskamaError(#[from]askama::Error),
}

impl ResponseError for WebError {}//serviceにわたす関数の返り値はResponse Errorトレイトを実装している必要がある。


#[get("/")]
async fn index() -> Result<HttpResponse,WebError>{

    let conn:SqliteConnection = establish_connection();
    let _posts:Vec<Post> = read_post(&conn,10);

    let html = PostTemplate{comments : _posts};
    let response_body = html.render()?;

    Ok(HttpResponse::Ok()
        .content_type("text/html")//HTTPレスポンスヘッダを参照
        .body(response_body))//receive ResponseBuilder and create Response
}

#[post("/add")]
async fn post_comment() -> Result<HttpResponse,WebError>{

    let conn:SqliteConnection = establish_connection();

    //let t:&str = params.body;

    Ok(HttpResponse::SeeOther()
        .header(header::LOCATION, "/")//HTTPレスポンスヘッダを参照
        .finish())//receive ResponseBuilder and create Response
}


#[actix_rt::main]
async fn main()->Result<(),actix_web::Error> {

    //let conn = establish_connection();

    HttpServer::new(move || {
        App::new()
            .service(index)
            .service(post_comment)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await?;

    Ok(())
}

