import { ButtonInteraction, CacheType, Client, Interaction } from 'discord.js';
import { DeleteResponse } from '../../interactionresponse/deleteresponse';
import { InteractionResponse } from '../../interactionresponse/interactionresponse';
import { ButtonCustomId } from '../../interactionresponse/interactionid';
import { Service } from 'typedi';
import Logger from 'bunyan';

@Service()
export class InteractionHandler {
    private readonly buttonResponses: Map<ButtonCustomId, InteractionResponse>;

    constructor(
        private readonly logger: Logger,
        deleteResponse: DeleteResponse
    ) {
        const buttonResponses: InteractionResponse<
            ButtonInteraction<CacheType>
        >[] = [deleteResponse];
        this.buttonResponses = new Map(
            buttonResponses.map((response) => [response.respondTo, response])
        );
    }

    public handle(client: Client, interaction: Interaction<CacheType>) {
        if (interaction.isButton()) {
            if (interaction.customId) {
                const response = this.buttonResponses.get(
                    interaction.customId as ButtonCustomId
                );
                if (!response) {
                    this.logger.warn(
                        `No response available for ${interaction.customId}`
                    );
                    return;
                }
                response.run(client, interaction);
            }
        }
    }
}
