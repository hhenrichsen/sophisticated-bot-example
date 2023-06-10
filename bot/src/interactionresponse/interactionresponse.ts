import { CacheType, Interaction } from 'discord.js';
import { ButtonCustomId } from './interactionid';

export abstract class InteractionResponse<
    InteractionType extends Interaction<CacheType> = Interaction<CacheType>
> {
    public abstract readonly respondTo: ButtonCustomId;
    public abstract run(interaction: InteractionType): void | Promise<void>;
}
