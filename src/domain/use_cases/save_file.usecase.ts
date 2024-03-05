import fs from 'fs';

export interface SaveFileUseCase {
    call: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor() {}

    call({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table',
    }: SaveFileOptions): boolean {
        try {
            const path = `${fileDestination}/${fileName}.txt`;
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(path, fileContent);
            return true;
        } catch (error) {
            // console.log(error);
            return false;
        }
    }
}
