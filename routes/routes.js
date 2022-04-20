const express = require('express')
const router = express.Router()
const Person = require('../models/Person.js')

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch(err) {
        res.status(422).json( {error: err} )
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne( {_id: id} )
        
        if(!person) {
            res.status(422).json( {message: 'usario não encontrado'})
            return
        }

        res.status(200).json(person)
    } catch(err) {
        res.status(422).json( {error: err} )
    }
})


router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body

    if (!name) {
        res.status(422).json( {message: 'name é obrigatório!'} )
        return
    }
    if (!salary) {
        res.status(422).json( {message: 'salary é obrigatório!'} )
        return
    }
    if (!approved) {
        res.status(422).json( {message: 'approved é obrigatório!'} )
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json( {message: 'Cadastro inserido com sucesso!'})
    } catch(err) {
        res.status(400).json( {error: err})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body
    
    const person = {
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updateOne( {_id: id}, person)

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json( {message: 'usario não encontrado'})
            return
        }

        res.status(200).json( {message: 'Cadastro modificado com sucesso!'})
    } catch(err) {
        res.status(400).json( {error: err})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne( {_id: id} )

    if(!person) {
        res.status(422).json( {message: 'usuario não encontrado'} )
        return
    }

    try {
        await Person.deleteOne( {_id: id} )
        res.status(200).json( {message: 'usuario removido com sucesso!'} )
    } catch(err) {
        res.status(400).json( {error: err})
    }
})

module.exports = router