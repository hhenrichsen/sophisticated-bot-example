import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';
import { Environment } from '../service/environment';
import Cache from 'node-cache';
import NodeCache from 'node-cache';

export abstract class CachedRepo<T extends ObjectLiteral> {
    private readonly cache: NodeCache;

    constructor(
        private readonly environment: Environment,
        protected readonly repo: Repository<T>
    ) {
        this.cache = new Cache({
            stdTTL: this.environment.get('DB_CACHE_TTL_SECONDS', 300, parseInt),
        });
    }

    protected async updateCache(id: string, value: T) {
        this.cache.set(id, value);
    }

    protected async findOneCached(
        id: string,
        options: FindOneOptions<T>
    ): Promise<T | undefined> {
        const cached = this.cache.get(id) as T;
        if (cached) {
            return cached;
        }
        const value = (await this.repo.findOne(options)) ?? undefined;
        if (value) {
            this.cache.set(id, value);
        }
        return value;
    }
}
