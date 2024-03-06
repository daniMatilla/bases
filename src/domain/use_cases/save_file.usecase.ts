import fs from 'fs';

interface SaveFileUseCase {
    call: (options: SaveFileOptions) => boolean;
}

interface SaveFileOptions {
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
            return false;
        }
    }
}
