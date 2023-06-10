import { Service } from 'typedi';

@Service()
export class Environment {
    public get(key: string): string | undefined;
    public get(key: string, def: string): string;
    public get<T = string>(key: string, def: T, parse: (value: string) => T): T;
    public get<T = string>(
        key: string,
        def?: T | undefined,
        parse?: (value: string) => T | undefined
    ): T | string | undefined {
        if (key in process.env) {
            const value = process.env[key];
            if (value) {
                if (parse) {
                    return parse(value);
                }
                return value;
            }
            return def;
        }
    }
}
