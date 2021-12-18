const express = require('express');
const faker = require('faker');

const app = express();
const PORT = 3002;
const IP = "192.168.1.109";
//? GET, RECIBIR PARAMETROS Y USAR QUERY
app.get('/', (req, res) => {
    return res.send('Bienvenido a mi REST API, los endpoints estan en routes/');
});


app.get('/perdidos', (req, res) => {
    let perdido = [
        { notebook: 'MacBook Pro M1 Pro 2021' },
        { nombre: 'asus rog m16 Zapphyre' }
    ]
    return res.json(perdido);
});

//? Si el parametro de categories, es distinto de 1, retorna gato, si no, perro en JSON
//* localhost/categories/4/animals/2 te da que es un gato y nombre Nivvy
//? Endpoints con parametros dinamicos, asi capturo parametros que vienen por Url, estos parametros los controlo con botones, asi voy dirigiendo al usuario para saber que queire ver, si hace click, le renderizo la data que quiere ver
app.get('/categories/:categoryId/animals/:animalsId', (req, res) => {
    const { categoryId, animalsId } = req.params
    if (categoryId == 1) {
        res.json({
            categoria: categoryId,
            animal: animalsId,
            clase: 'perro',
            nombre: 'Luna',
        })
    } else {
        res.json({
            categoria: categoryId,
            animal: animalsId,
            clase: 'gato',
            nombre: 'Nivvy',
        })
    }
})

//? Cantidad de categorias en animalitosPerdidos
app.get('/categories', (req, res) => {
    res.json([
        {
            animal: 'perro',
            perdidos: [{}, {}, {}] //Objeto que define a cada animal perdido
        },
        {
            animal: 'gato',
            perdidos: [{}, {}, {}]
        }
    ])
})


//$GET QUERYS (son opcionales)
//* localhost/users?limit=10&offset=200
app.get('/users', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) {
        res.json({
            limit,
            offset
        })
    } else {
        res.send('No hay parametros')
    }
})


//$Los endpoints especificos (/productos/filter) deben declararse ante de los endpoints dinamicos (/productos/:productId)
app.get('/productos/filter', (req, res) => {
    res.send('soy un filter');
})

app.get('/productos/:productId', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: 'Macbook pro 2021 M1 pro',
        price: 2080
    })
})

app.get('/animalitos', (req, res) => {
    const { limit } = req.query
    //$localhost/animalitos?size=1000
    let animales = [];
    for (i = 0; i < limit; i++) {
        animales.push({
            name: faker.animal.cat(),
            img: faker.image.cats(),
        })
    }

    res.json(animales)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}, connect to the app via IP: http://${IP}:${PORT}/`);
});