import { Client, MessageReaction, User } from 'discord.js';
import { Service } from 'typedi';
import { ReactionResponse } from '../../reaction/reaction';
import { GuildRepository } from '../../repositories/guild.repository';

@Service()
export class ReactHandler {
    private readonly reactions: ReactionResponse[];

    constructor(private readonly guildRepo: GuildRepository) {
        this.reactions = [];
    }

    public async handle(client: Client, reaction: MessageReaction, user: User) {
        if (user.bot) {
            return;
        }
        const guild =
            (reaction.message.guildId &&
                (await this.guildRepo.createOrGetGuild(
                    reaction.message.guildId
                ))) ||
            undefined;
        for (const response of this.reactions) {
            if (await response.shouldHandle(client, reaction, user, guild)) {
                return response.run(client, reaction, user, guild);
            }
        }
    }
}
