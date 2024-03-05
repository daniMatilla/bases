export interface CreateTableUseCase {
    call: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {
    constructor() {}

    call({ base, limit = 10 }: CreateTableOptions) {
        let output: string = ``;        
        const numbers = Array.from({ length: limit }, (_, i) => i + 1);

        for (const n of numbers) {
            output += `${base} x ${n} = ${base * n}\n`;
        }

        return output;
    }
}
