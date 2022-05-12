
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Nisi aute sit do labore aute eu laboris proident ad nisi.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'InProgress: Magna non laboris est enim.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Finished: Adipisicing velit incididunt ad anim dolore duis nostrud irure esse.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}