import { CacheType, Interaction, SlashCommandBuilder } from 'discord.js';
import { Service } from 'typedi';
import { Command } from './command';

@Service()
export class PingCommand extends Command {
    public readonly type = PingCommand;

    declaration = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks if the bot is working')
        .toJSON();

    async run(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        await interaction.reply('Pong!');
    }
}
