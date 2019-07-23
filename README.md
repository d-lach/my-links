# My Links

Urls customization service made for educational purposes with node.js and express.

###### Setup:
1. `cp docker/.env.example docker/.env`
2. fill up `docker/.env`
3. `make install` (leave passphrase empty when asked)
4. fill up `server/.env` and `test/.env`

###### Running:
`make dev` to run server containers and node

###### Testing:
`make test` (requires running server containers)

###### Logs:
`make inspect` - view logs from the Node container updated in real time

`make logs` - view recent logs from all containers

