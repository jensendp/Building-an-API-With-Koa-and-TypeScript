import { ITaskRepository } from "./taskrepository";
import { Task } from "../models/task";

export class InMemoryTaskRepository implements ITaskRepository {

    private _tasks: Task[] = [];
    private _nextId = 1;

    async getAll(): Promise<Task[]> {
        return this._tasks;
    }

    async get(taskId: number): Promise<Task> {
        const task = this._tasks.find(t => t.id === taskId);
        return task;
    }

    async create(task: Task): Promise<Task> {
        task.id = this._nextId;
        this._nextId++;
        this._tasks.push(task);

        return task;
    }

    async update(taskId: number, task: Task): Promise<Task> {
        let updatedTask = this._tasks.filter(t => t.id === taskId)[0];
        updatedTask.name = task.name;
        updatedTask.isComplete = task.isComplete;

        return updatedTask;
    }

    async delete(taskId: number): Promise<Task> {
        const index = this._tasks.findIndex(t => t.id === taskId);
        const task = this._tasks[index];
        this._tasks.splice(index, 1);

        return task;
    }
}