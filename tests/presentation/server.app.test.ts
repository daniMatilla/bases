import { CreateTable } from '../../src/domain/use_cases/create_table.usecase';
import { SaveFile } from '../../src/domain/use_cases/save_file.usecase';
import { ServerApp } from '../../src/presentation/server.app';

describe('server.app', () => {
    const defaultOptions = {
        base: 2,
        limit: 10,
        printTable: false,
        fileName: 'test-filename',
        fileDestination: 'test-destination',
    };
    const createTableReturnValue: string = '1 x 2 = 2';
    let options = {...defaultOptions};

    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn();
    const saveFileMock = jest.fn();
    const buildMocksAndRun = (saveFileMockValue: boolean = true) => {
        createMock.mockReturnValue(createTableReturnValue);
        saveFileMock.mockReturnValue(saveFileMockValue);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.call = createMock;
        SaveFile.prototype.call = saveFileMock;

        ServerApp.run(options);
    };
    
    afterEach(() => {
        options = {...defaultOptions};
        jest.resetAllMocks();
        jest.resetModules();
    })

    test('should crate ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp, create file and not print table', () => {
        buildMocksAndRun();

        expect(logMock).toHaveBeenCalledWith('Server running ...\n');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: createTableReturnValue,
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });
        expect(logMock).toHaveBeenLastCalledWith('File created!');
        expect(logMock).not.toHaveBeenCalledWith(createTableReturnValue);
        
        expect(logErrorMock).not.toHaveBeenCalledWith('File not created!');
    });

    test('should run ServerApp, create file and print table', () => {
        options.printTable = true;
        buildMocksAndRun();
        
        expect(logMock).toHaveBeenCalledWith('Server running ...\n');
        expect(logMock).toHaveBeenCalledWith('File created!');
        expect(logMock).toHaveBeenCalledWith(createTableReturnValue);
        
        expect(logErrorMock).not.toHaveBeenCalledWith('File not created!');
    });
    
    test('should run ServerApp and not create file', () => {
        buildMocksAndRun(false);
        
        expect(logMock).toHaveBeenCalledWith('Server running ...\n');
        expect(logMock).not.toHaveBeenCalledWith('File created!');
        expect(logErrorMock).toHaveBeenCalledWith('File not created!');
        
        expect(logMock).not.toHaveBeenCalledWith(createTableReturnValue);
    });
});
