FROM rust:latest

WORKDIR /board/backend

# usage : host-path container-path(to be relative path from WORKDIR)
COPY ./backend/Cargo.toml ./Cargo.toml
COPY ./backend/src ./src
COPY ./backend/templates ./templates
RUN cargo install diesel_cli --no-default-features --features sqlite && \
    echo DATABASE_URL=./board.db > .env && \ 
    diesel setup

RUN cargo build --release && \
    cargo install --path . 


ENTRYPOINT [ "board" ] 