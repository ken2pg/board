FROM rust:latest

WORKDIR /board/backend

# usage : host-path container-path(to be relative path from WORKDIR)
COPY ./backend/Cargo.toml ./Cargo.toml
COPY ./backend/src ./src
COPY ./backend/templates ./templates
COPY ./backend/migrations ./migrations
# TODO Add write cmd for sql
RUN cargo install diesel_cli --no-default-features --features sqlite && \
    echo DATABASE_URL=./board.db > .env && \ 
    diesel setup && \
    diesel migration run && \
    diesel migration redo 

RUN cargo build --release && \
    cargo install --path . 


ENTRYPOINT [ "board" ] 
