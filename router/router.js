import express from 'express';
import mongoose from 'mongoose';
import { board, list, card } from '../db/kanban.js';




const router = express.Router();

//Kanban board oluşturma
router.post('/', async (req, res) => {
    try {
        const requestBoard = req.body;
        const createdBoard = await board.create(requestBoard);
        const backlog = {
            title: 'backlog',
            boardId: createdBoard.id,
            position: 0
        };
        const todo = {
            title: 'todo',
            boardId: createdBoard.id,
            position: 1
        };
        const inprogress = {
            title: 'inprogress',
            boardId: createdBoard.id,
            position: 2
        };
        const designed = {
            title: 'designed',
            boardId: createdBoard.id,
            position: 3
        };
        const todoList = await list.create(todo);
        const backlogList = await list.create(backlog);
        const inprogressList = await list.create(inprogress);
        const designedList = await list.create(designed);


        res.status(201).json({ createdBoard, todoList ,backlogList,inprogressList,designedList})
    } catch (error) {
        console.log(error);
        res.json({ message: 'Create board failed' })
    }
})
// id ye göre kanban board getirme
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ message: 'board id is not valid ' })
    }
    
    try {
        const response = await board.findById(id);

        const lists= await list.find({boardId:response._id})

        res.status(200).json({response,lists})

    } catch (error) {
        res.status(404).json({ message: error.message })
    }


})
//Listeyi id ye göre getirme
router.get('/list/:id', async (req, res) => {

    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'board id is not valid ' })

        const responseBoard = await list.findById(id)
        if (!responseBoard) return

        res.status(200).json(responseBoard)

    } catch (error) {
        res.status(404).json({ message: 'board not found' })
    }

})
// kart oluşturma
router.post('/card', async (req, res) => {
    try {
        const requestcard = req.body;
        const response = await card.create(requestcard);

        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        res.json({ message: 'Create card failed' })
    }
})
//kart güncelleme
router.put('/card/:id', async (req, res) => {

    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Memory id is not valid ' })

        const { title, description, position, listId} = req.body
        const updatedcard = await card.findByIdAndUpdate(

            id,
            { title, description, position, listId, _id: id },
            { new: true }

        )

        res.status(200).json(updatedcard)

    } catch (error) {
        console.log(error.message)
        res.json({ message: 'Update failed' })
    }

})
// kart silme
router.delete('/card/:id', async (req, res) => {

    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'card id is not valid ' })

        await card.findByIdAndDelete(id)

        res.status(200).json({ message: 'card has been deleted' })

    } catch (error) {
        console.log(error.message)
        res.json({ message: 'card delete failed' })
    }

})


export default router