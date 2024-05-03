### Sequences app

Para lanzar la app:

`docker compose up`

Ejecutar los tests:

`npm test`

**Nota***

Hay tests de integración que se lanzan contra la base de datos de development, en un entorno real estos test deberian lanzarse contra una base de datos específica de testing.

## Endpoints :

### **POST signup**

`http://localhost:3000/api/user/signup`

Body:

```	json
{
    "email": "user@gmail.com", "password": "123456"
}
	
```
Response:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzQwYTlhMTQ2YjllZWMzNzlhZjI1OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE0Njg2NjE4LCJleHAiOjE3MTQ2ODY5MTh9.EZw726K-KQWgQJv3OtO1quk0aujq8ffoDkBlV-Fa3x8",
    "user": {
        "email": "22s1@gmail.com",
        "role": "user",
        "_id": "66340a9a146b9eec379af259",
        "dateAdded": "2024-05-02T21:50:18.731Z"
    }
}
```

### **POST login**

`http://localhost:3000/api/user/login`

Body:

```json
{
    "email": "user@gmail.com", "password": "123456"
}
```
Response:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzQwYTlhMTQ2YjllZWMzNzlhZjI1OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE0Njg2NjE4LCJleHAiOjE3MTQ2ODY5MTh9.EZw726K-KQWgQJv3OtO1quk0aujq8ffoDkBlV-Fa3x8",
    "user": {
        "email": "22s1@gmail.com",
        "role": "user",
        "_id": "66340a9a146b9eec379af259",
        "dateAdded": "2024-05-02T21:50:18.731Z"
    }
}
```

### **GET sequences** (Necesita autorización)

`http://localhost:3000/api/sequence`

Headers: 

```json
{ 
	"Authorization" : "Bearer ${accesToken obtenido de login}" 
}
```
Response:
```json
[

    {
        "_id": "6633f827d8bb0f0ab609e138",
        "sequence": [
            1,
            2,
            3
        ],
        "subSequences": [
            [1],
            [2],
            [3],
            [1,2],
            [1,3],
            [2,3],
            [1,2,3]
        ]
    },...
]
```


### **POST sequences (Necesita autorización)**

`http://localhost:3000/api/sequence`

Body:

```json
{
    "sequence":[1,2,3]
}
```

Headers: 

```json
{
    "Authorization" : "Bearer ${accesToken obtenido de login}" 
}
```

Response :
```json
{
[

    {
        "_id": "6633f827d8bb0f0ab609e138",
        "sequence": [
            1,
            2,
            3
        ],
        "subSequences": [
            [1],
            [2],
            [3],
            [1,2],
            [1,3],
            [2,3],
            [1,2,3]
        ]
    }
]
}
```


