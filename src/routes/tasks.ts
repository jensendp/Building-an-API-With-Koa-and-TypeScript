import { TaskService } from './../services/taskservice';
import * as Router from 'koa-router';
import { InMemoryTaskRepository } from '../repositories/inmemorytaskrepository';
import { Task } from '../models/task';

const router = new Router();
const service = new TaskService(new InMemoryTaskRepository());

router.get('/tasks', async (ctx) => {
    const tasks = await service.getAllTasks();

    ctx.status = 200;
    ctx.body = tasks;
});

router.get('/tasks/:id', async (ctx) => {
    const task = await service.getTask(Number(ctx.params.id));

    if(task) {
        ctx.status = 200;
        ctx.body = task;
    }else {
        ctx.throw(404);
    }
});

router.post('/tasks', async (ctx) => {
    const task = <Task>ctx.request.body;
    const newTask = await service.createTask(task);

    ctx.status = 201;
    ctx.body = newTask;
    ctx.set('location', 'http://localhost:3000/tasks/' + newTask.id);
});

router.put('/tasks/:id', async (ctx) => {
    const task = <Task>ctx.request.body;
    const updatedTask = await service.updateTask(Number(ctx.params.id), task);

    if(updatedTask) {
        ctx.status = 200;
        ctx.body = updatedTask;
    }else {
        ctx.throw(404);
    }
});

router.delete('/tasks/:id', async (ctx) => {
    const deletedTask = await service.deleteTask(Number(ctx.params.id));

    if(deletedTask) {
        ctx.status = 200;
        ctx.body = deletedTask;
    }else {
        ctx.throw(404);
    }
});

export default router;