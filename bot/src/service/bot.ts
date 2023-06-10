import Logger from 'bunyan';
import { Client, GatewayIntentBits, Partials, REST, Routes } from 'discord.js';
import { Service } from 'typedi';
import { CommandHandler } from './command/commandhandler';
import { CommandRegistry } from './command/commandregistry';
import { ReactHandler } from './reaction/reacthandler';
import { unpartial } from '../util/unpartial';
import { InteractionHandler } from './interaction/interactionhandler';

const { BOT_TOKEN, BOT_CLIENT_ID } = process.env;

@Service()
export class Bot {
    private client: Client;
    private rest: REST;
    private token: string;

    constructor(
        private readonly logger: Logger,
        private readonly commandRegistry: CommandRegistry,
        private readonly commandHandler: CommandHandler,
        private readonly reactHandler: ReactHandler,
        private readonly interactionHandler: InteractionHandler
    ) {
        if (!BOT_TOKEN) {
            throw new Error(
                'BOT_TOKEN was not set, bot cannot be initialized.'
            );
        }
        this.token = BOT_TOKEN;

        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
            ],
            partials: [
                Partials.Message,
                Partials.User,
                Partials.Reaction,
                Partials.Channel,
            ],
        });

        this.rest = new REST({ version: '10' });

        this.registerListeners();
    }

    public login() {
        this.client.login(this.token);
        this.addCommands();
    }

    private addCommands() {
        if (BOT_CLIENT_ID) {
            this.rest.setToken(this.token);
            const commands = this.commandRegistry.getCommandDeclarations();
            this.rest.put(Routes.applicationCommands(BOT_CLIENT_ID), {
                body: commands,
            });
            this.logger.info(`Registered ${commands.length} commands.`);
        } else {
            this.logger.warn(
                'No BOT_CLIENT_ID provided; slash commands may not work.'
            );
        }
    }

    private registerListeners() {
        this.client.on('ready', () => {
            this.logger.info('Bot ready!');
        });

        this.client.on('interactionCreate', (interaction) => {
            if (interaction.isChatInputCommand()) {
                this.commandHandler.handle(interaction);
            } else {
                this.interactionHandler.handle(this.client, interaction);
            }
        });

        this.client.on(
            'messageReactionAdd',
            async (possibleReaction, possibleUser) => {
                const reaction = await unpartial(possibleReaction);
                const user = await unpartial(possibleUser);
                this.reactHandler.handle(this.client, reaction, user);
            }
        );
    }
}
