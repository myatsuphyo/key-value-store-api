# key-value Store API

### Description
    Key-value pairs are stored in the following format.
    {
        "history": [
            {
                "value": "value0",
                "timestamp": 1583045290
            },
            {
                "value": "value1",
                "timestamp": 1583045279
            },
            {
                "value": "value2",
                "timestamp": 1583045356
            },
            {
                "value": "value3",
                "timestamp": 1583045371
            },
            {
                "value": "value4",
                "timestamp": 1583046413
            }
        ],
        "timestamp": 1583046413,
        "key": "mykey0",
        "value": "value4"
    }

    - Array "history" keeps history of changing values of the same key. 
    - Any given timestamp can be used to find out value of the key at that moment by using "Iterative Merging" algorithm. 
    - The simple logic of this algorithm is to find index of array which has the closest timestamp compared to given timestamp.

### Prerequisites

- nodemon: `npm i -g nodemon`
- mongodb: `npm install mongodb` & `npm services start mongodb`

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
curl -X GET http://localhost:8000/object/mykey?timestamp=1583045371

# get all key-value pairs (default limit 50)
curl -X GET http://localhost:8000/object
```
