import { CacheType, Client, Interaction } from 'discord.js';
import { ButtonCustomId } from './interactionid';

export abstract class InteractionResponse<
    InteractionType extends Interaction<CacheType> = Interaction<CacheType>
> {
    public abstract readonly respondTo: ButtonCustomId;
    public abstract run(
        client: Client,
        interaction: InteractionType
    ): void | Promise<void>;
}
