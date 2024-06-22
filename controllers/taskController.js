import taskModel from "../models/taskModel.js"
import userModel from "../models/userModel.js"







// Get all tasks
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskModel.find();
        res.status(200).send({
            success: true,
            message: 'Tasks retrieved successfully',
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

// Create a new task
export const createTask = async (req, res, next) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const task = await taskModel.create({ title, description, dueDate, priority });
        res.status(201).send({
            success: true,
            message: 'Task created successfully',
            task,
        });
    } catch (error) {
        next(error);
    }
};

// Get a specific task
export const getTask = async (req, res, next) => {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).send({
                success: false,
                message: 'Task not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Task retrieved successfully',
            task,
        });
    } catch (error) {
        next(error);
    }
};

// Update a task
export const updateTask = async (req, res, next) => {
    const { title, description, dueDate, priority, status } = req.body;
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, { title, description, dueDate, priority, status }, { new: true });
        if (!task) {
            return res.status(404).send({
                success: false,
                message: 'Task not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Task updated successfully',
            task,
        });
    } catch (error) {
        next(error);
    }
};

// Delete a task
export const deleteTask = async (req, res, next) => {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({
                success: false,
                message: 'Task not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// Update task status
export const updateTaskStatus = async (req, res, next) => {
    const { status } = req.body;
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!task) {
            return res.status(404).send({
                success: false,
                message: 'Task not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Task status updated successfully',
            task,
        });
    } catch (error) {
        next(error);
    }
};


