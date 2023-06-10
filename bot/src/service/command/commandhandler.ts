import Logger from 'bunyan';
import { ChatInputCommandInteraction, CacheType } from 'discord.js';
import { Service } from 'typedi';
import { CommandRegistry } from './commandregistry';
import { GuildRepository } from '../../repositories/guild.repository';

@Service()
export class CommandHandler {
    constructor(
        private readonly logger: Logger,
        private readonly commandRegistry: CommandRegistry,
        private readonly guildRepo: GuildRepository
    ) {}

    public async handle(interaction: ChatInputCommandInteraction<CacheType>) {
        this.logger.debug(`Handling command ${interaction.commandName}`);
        const guild =
            (interaction.guildId &&
                (await this.guildRepo.createOrGetGuild(interaction.guildId))) ||
            undefined;
        const command = this.commandRegistry.getCommand(
            interaction.commandName
        );
        if (command) {
            command.run(interaction, guild);
        } else {
            this.logger.warn(
                `Trying to execute nonexistent command ${interaction.commandName}`
            );
        }
    }
}
