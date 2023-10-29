cd indy-sdk/experimental/plugins/postgres_storage
pwd
## OUTPUT: .../indy-sdk/experimental/plugins/postgres_storage
apt install -y cargo
cargo build --release
#pwd
## OUTPUT: .../indy-sdk/experimental/plugins/postgres_storage
mv ./target/release/libindystrgpostgres.so /usr/local/lib/libindystrgpostgres.so