import { ButtonInteraction, CacheType, Interaction } from 'discord.js';
import { InteractionResponse } from '../../interactionresponse/interactionresponse';
import { ButtonCustomId } from '../../interactionresponse/interactionid';
import { Service } from 'typedi';

@Service()
export class InteractionHandler {
    private readonly buttonResponses: Map<ButtonCustomId, InteractionResponse>;

    constructor() {
        const buttonResponses: InteractionResponse<
            ButtonInteraction<CacheType>
        >[] = [];
        this.buttonResponses = new Map(
            buttonResponses.map((response) => [response.respondTo, response])
        );
    }

    public handle(interaction: Interaction<CacheType>) {
        if (interaction.isButton()) {
            if (
                interaction.customId &&
                interaction.customId in ButtonCustomId
            ) {
                const response = this.buttonResponses.get(
                    interaction.customId as ButtonCustomId
                );
                if (!response) {
                    return;
                }
                response.run(interaction);
            }
        }
    }
}
