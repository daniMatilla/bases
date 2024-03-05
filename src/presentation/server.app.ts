import { CreateTable } from '../domain/use_cases/create_table.usecase';
import { SaveFile } from '../domain/use_cases/save_file.usecase';

interface RunOptions {
    base: number;
    limit: number;
    printTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {
    static run({ base, limit, printTable, fileName, fileDestination }: RunOptions) {
        console.log('Server running ...\n');

        const table = new CreateTable().call({ base, limit });
        const fileSaved = new SaveFile().call({
            fileContent: table,
            fileDestination: fileDestination,
            fileName: fileName,
        });

        if (fileSaved) console.log('File created!');
        if (printTable) console.log(table);
    }
}
