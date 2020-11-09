FROM rust:latest

WORKDIR /board/backend

# usage : host-path container-path(to be relative path from WORKDIR)
COPY ./backend/Cargo.toml ./Cargo.toml
COPY ./backend/src ./src
COPY ./backend/templates ./templates

RUN cargo build --release && \
    cargo install --path .

ENTRYPOINT [ "board" ] 