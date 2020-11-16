extern crate board;
extern crate diesel;
extern crate serde_json;

use actix_web::{http::header,post,get,web,App,HttpResponse,HttpServer,ResponseError};
use diesel::sqlite::SqliteConnection;
use board::db_operations::*;
use board::models::{Post,Add,NewPost,PostTemplate,WebError};
use askama::Template;


#[get("/")]
async fn index() -> Result<HttpResponse,WebError>{
    let conn:SqliteConnection = establish_connection();
    let _posts:Vec<Post> = read_post(&conn,10);

    let html = PostTemplate{comments : _posts};
    let response_body = html.render()?;

    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(response_body))
}

#[post("/add")]
async fn post_comment(info: web::Form<Add>) -> Result<HttpResponse,WebError>
{
    let conn:SqliteConnection = establish_connection();

    let new_post = NewPost {
        name: "名無しのアトリエ",
        body: &info.text,
        hobby: Some("アトリエ"),
        email: Some("atelier@atelier.com"),
    };

    create_post(&conn,&new_post);

    Ok(HttpResponse::SeeOther()
        .header(header::LOCATION, "/")
        .finish())
}

#[get("/test")]
async fn generate_json() -> Result<HttpResponse,WebError>
{
    let json = serde_json::json!({
        "text": "hello,world!",
    });

    Ok(HttpResponse::SeeOther()
        .header(header::LOCATION, "/")
        .content_type("text/json")
        .body(json))
}

#[actix_rt::main]
async fn main()->Result<(),actix_web::Error> {

    let conn:SqliteConnection = establish_connection();

    HttpServer::new(move || {
        App::new()
            .service(index)
            .service(post_comment)
            .service(generate_json)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await?;

    Ok(())
}

