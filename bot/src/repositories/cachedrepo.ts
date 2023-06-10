import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';
import { Environment } from '../service/environment';
import Cache from 'timed-cache';

export abstract class CachedRepo<T extends ObjectLiteral> {
    private readonly cache: Cache<T>;

    constructor(
        private readonly environment: Environment,
        protected readonly repo: Repository<T>
    ) {
        this.cache = new Cache({
            defaultTtl: this.environment.get(
                'DB_CACHE_TTL_SECONDS',
                300,
                parseInt
            ),
        });
    }

    protected async findOneCached(id: string, options: FindOneOptions<T>) {
        const cached = this.cache.get(id);
        if (cached) {
            return cached;
        }
        const value = (await this.repo.findOne(options)) ?? undefined;
        if (value) {
            this.cache.put(id, value);
        }
        return value;
    }
}
