import { Client, MessageReaction, User } from 'discord.js';
import { Guild } from '../entities/guild.entity';

export abstract class ReactionResponse {
    public abstract shouldHandle(
        client: Client,
        reaction: MessageReaction,
        user: User,
        guild?: Guild | undefined
    ): boolean | Promise<boolean>;

    public abstract run(
        client: Client,
        reaction: MessageReaction,
        user: User,
        guild?: Guild | undefined
    ): void | Promise<void>;
}
