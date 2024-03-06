interface CheckUseCase {
    call(url: string): Promise<void>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: Error) => void;

export class Check implements CheckUseCase {
    constructor(private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) {}

    async call(url: string): Promise<void> {
        try {
            const rep = await fetch(url);
            if (!rep.ok) throw new Error(`Check service ${url}`);

            this.successCallback();
        } catch (error) {
            this.errorCallback(error as Error);
        }
    }
}
