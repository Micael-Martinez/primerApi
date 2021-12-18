//? Requerir express para llamar a router
//$Aca requiero a faker porque relleno de animales random con faker
const express = require('express');;
const faker = require('faker');

const router = express.Router();

//esta asumido el endpount /animals, asi que no lo pongo al rutear con router(estoy programando especificamente para el endpoint /animals ->)

//$ localhost/animalitos
router.get('/', (req, res) => {
    const { limit } = req.query
    const size = limit || 10;

    //$localhost/animalitos?size=1000
    let animales = [];
    for (i = 0; i < size; i++) {
        animales.push({
            name: faker.animal.cat(),
            img: faker.image.cats(),
        })
    }
    res.json(animales)
})

router.get('/:animalId', (req, res) => {
    const { animalId } = req.params;
    res.json({
        animalId,
        name: 'Macbook pro 2021 M1 pro',
        price: 2080
    })
})

//$ localhost/animals/filter
router.get('/filter', (req, res) => {
    res.send('yo soy un filter')
})

//exportar el router, que contiene los metodos programados con los endpoints
module.exports = router;

