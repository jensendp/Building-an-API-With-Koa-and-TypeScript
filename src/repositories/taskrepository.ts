import { Task } from "../models/task";

export interface ITaskRepository {
    getAll(): Promise<Task[]>;
    get(taskId: number): Promise<Task>;
    create(task: Task): Promise<Task>;
    update(taskId: number, task: Task): Promise<Task>;
    delete(taskId: number): Promise<Task>;
}