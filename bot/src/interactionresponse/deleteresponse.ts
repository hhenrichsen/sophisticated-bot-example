import { Service } from 'typedi';
import { InteractionResponse } from './interactionresponse';
import {
    CacheType,
    ButtonInteraction,
    ButtonBuilder,
    ButtonStyle,
    Client,
} from 'discord.js';
import { ButtonCustomId } from './interactionid';
import { Bot } from '../service/bot';
import Logger from 'bunyan';

@Service()
export class DeleteResponse extends InteractionResponse<
    ButtonInteraction<CacheType>
> {
    public respondTo: ButtonCustomId = ButtonCustomId.DeleteMessage;
    constructor(private readonly bot: Bot, private readonly logger: Logger) {
        super();
    }

    public readonly button = new ButtonBuilder({
        emoji: '🗑️',
        label: 'Delete',
        style: ButtonStyle.Danger,
        customId: ButtonCustomId.DeleteMessage,
    });

    public run(
        client: Client,
        interaction: ButtonInteraction<CacheType>
    ): void | Promise<void> {
        if (!interaction.message) {
            this.logger.debug('Non-message interaction');
            return;
        }
        if (interaction.message.author.id != client.user?.id) {
            this.logger.debug('Non-self interaction');
            return;
        }
        return interaction.message.delete().then();
    }
}
