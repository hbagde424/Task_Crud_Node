import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask, updateTaskStatus } from "../controllers/taskController.js";



const router = express.Router()

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.get('/tasks/:id', getTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id/status', updateTaskStatus);


export default router