import { MessageReaction, User } from 'discord.js';
import { Guild } from '../entities/guild.entity';

export abstract class ReactionResponse {
    public abstract shouldHandle(
        reaction: MessageReaction,
        user: User,
        guild?: Guild | undefined
    ): boolean | Promise<boolean>;

    public abstract run(
        reaction: MessageReaction,
        user: User,
        guild?: Guild | undefined
    ): void | Promise<void>;
}
