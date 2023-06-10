import {
    CacheType,
    ChatInputCommandInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js';
import { Constructor } from '../types/constructor';
import { Guild } from '../entities/guild.entity';

export abstract class Command {
    public abstract readonly declaration: RESTPostAPIApplicationCommandsJSONBody;
    protected abstract type: Constructor<Command>;
    public abstract run(
        interaction: ChatInputCommandInteraction<CacheType>,
        guild?: Guild | undefined
    ): Promise<void> | void;
}
