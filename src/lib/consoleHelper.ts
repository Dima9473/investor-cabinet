import { APP_MODE } from "./constants/env";

export class ConsoleHelper {
    static warn(message: string) {
        if (APP_MODE === 'development') {
            console.warn(message);
        }
    }
}


