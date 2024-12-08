export interface Task {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    priority: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}