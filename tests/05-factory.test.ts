import { buildMakePerson } from '../src/js-foundation/05-factory';

describe('05-factory', () => {
    const getUUID = () => '1234';
    const getAge = () => 35;

    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        expect(typeof makePerson).toBe('function');
    });

    test('buildMakePerson should return a person', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        const person = makePerson({name: 'John Doe', birthdate: '1980-12-26'});
        
        expect(person).toEqual({
            id: '1234',
            name: 'John Doe',
            birthdate: '1980-12-26',
            age: 35,
        });
    });
});
