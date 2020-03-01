# key-value Store API

### Prerequisites

- nodemon: `npm i -g nodemon`
- mongodb: `brew install mongodb` & `brew services start mongodb`

### Install

```bash
$ git clone https://github.com/myatsuphyo/key-value-store-api.git
$ cd key-value-store-api.git
$ npm install
```

### Configure & Run

```bash
$ cp .env.example .env.development
$ npm run dev
```

### Test with `curl`

```bash
# create new key-value pair
curl -H "Content-Type: application/json" -X POST -d '{"mykey":"value"}' http://localhost:8000/object

# get value by key
curl -X GET http://localhost:8000/object/mykey

# get value by key with timestamp
curl -X GET http://localhost:8000/object/mykey?timestamp=1575376200

# get all key-value pairs (default limit 50)
curl -X GET http://localhost:3000/object
```
