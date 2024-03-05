import { CreateTable } from '../../src/domain/use_cases/create_table.usecase';

describe('create_table', () => {
    const createTable = new CreateTable();

    test('should create table with default values', () => {
        const values = { base: 2 };
        const table = createTable.call(values);
        const rows = table.split('\n');

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows.length).toBe(10);
        expect(rows[0]).toBe(`${values.base} x 1 = 2`);
        expect(rows[4]).toBe(`${values.base} x 5 = 10`);
        expect(rows[9]).toBe(`${values.base} x 10 = 20`);
    });
    
    test('should create table with custom values', () => {
        const values = { base: 3, limit: 7 };

        const table = createTable.call(values);
        const rows = table.split('\n');        

        expect(rows.length).toBe(values.limit);
        expect(rows[0]).toBe(`${values.base} x 1 = 3`);
        expect(rows[4]).toBe(`${values.base} x 5 = 15`);
        expect(rows[6]).toBe(`${values.base} x 7 = 21`);
        expect(rows[values.limit]).toBeUndefined()
    });
});
