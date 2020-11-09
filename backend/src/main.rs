use actix_web::{get,App,HttpResponse,HttpServer,ResponseError};
use askama::Template;
use thiserror::Error;

#[derive(Debug)]
struct Comment{
    id: u32,
    name: String,
    email: String,
    hobby: String,
    text: String,
}

#[derive(Template)]
#[template(path="index.html")]
struct Wrapper{
    comments:Vec<Comment>,
}

#[derive(Debug,Error)]
enum WebError
{
    #[error("Failed!")]//derive(Error)すると、この書き方でprintln!()が実装できる。よってここでDisplayを導出している。
    R2d2Error(#[from]r2d2::Error),

    #[error("Failed!")]
    AskamaError(#[from]askama::Error),
}

impl ResponseError for WebError {}//serviceにわたす関数の返り値はResponse Errorトレイトを実装している必要がある。


#[actix_rt::main]
async fn main()->Result<(),actix_web::Error> {
    HttpServer::new(move || {
        App::new()
            .service(index)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await?;

    Ok(())
}

#[get("/")]
async fn index() -> Result<HttpResponse,WebError>{
    let mut comments = Vec::new();

    comments.push(
        Comment{
           id : 0,
           name : "A".to_string(),
           email : "example@example.com".to_string(),
           hobby : "Atelier".to_string(),
           text : "You must play Atelier.".to_string(),
        }
    );

    let html=Wrapper{ comments };
    let response_body = html.render()?;

    Ok(HttpResponse::Ok()
        .content_type("text/html")//HTTPレスポンスヘッダを参照
        .body(response_body))//receive ResponseBuilder and create Response
}