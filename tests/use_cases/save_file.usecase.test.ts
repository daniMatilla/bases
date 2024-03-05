import fs from 'fs';
import { SaveFile } from '../../src/domain/use_cases/save_file.usecase';

describe('SaveFileUseCase', () => {
    const saveFile = new SaveFile();
    const defaultOptions = {
        fileDestination: 'outputs',
        fileName: 'table',
    };
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom_outputs',
        fileName: 'custom_name',
    };

    afterAll(() => {
        if (fs.existsSync(defaultOptions.fileDestination))
            fs.rmSync(defaultOptions.fileDestination, { recursive: true });
        if (fs.existsSync(customOptions.fileDestination))
            fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('should save file with default values', () => {
        const options = {
            fileContent: 'test content',
        };

        const filePath = `${defaultOptions.fileDestination}/${defaultOptions.fileName}.txt`;

        const fileSaved = saveFile.call(options);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {
            encoding: 'utf-8',
        });

        expect(fileSaved).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toEqual(options.fileContent);
    });

    test('should save file with custom values', () => {
        const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

        const fileSaved = saveFile.call(customOptions);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {
            encoding: 'utf-8',
        });

        expect(fileSaved).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toEqual(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => {
        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        const fileSaved = saveFile.call(customOptions);

        expect(fileSaved).toBeFalsy();

        mkdirMock.mockRestore();
    });

    test('should return false if file could not be created', () => {
        const writeFileMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        const fileSaved = saveFile.call(customOptions);

        expect(fileSaved).toBeFalsy();

        writeFileMock.mockRestore();
    });
});
