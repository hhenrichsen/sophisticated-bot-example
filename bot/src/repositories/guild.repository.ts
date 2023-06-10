import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { Guild } from '../entities/guild.entity';
import { Environment } from '../service/environment';
import { CachedRepo } from './cachedrepo';

@Service()
export class GuildRepository extends CachedRepo<Guild> {
    constructor(environment: Environment, dataSource: DataSource) {
        super(environment, dataSource.getRepository(Guild));
    }

    public async getGuildById(id: string): Promise<Guild | undefined> {
        return this.findOneCached(id, { where: { id } });
    }
}
