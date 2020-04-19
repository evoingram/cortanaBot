const restify = require('restify');
const path = require('path');

const { BotFrameworkAdapter, ConversationState, MemoryStorage, UserState } = require('botbuilder');

const { DialogBot } = require('./bots/dialogBot');
const { UserProfileDialog } = require('./dialogs/userProfileDialog');

const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

const adapter = new BotFrameworkAdapter({
	appId: process.env.MicrosoftAppId,
	appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
	console.error(`\n [onTurnError] unhandled error: ${error}`);

	await context.sendTraceActivity(
		'OnTurnError Trace',
		`${error}`,
		'https://www.botframework.com/schemas/error',
		'TurnError'
	);

	await context.sendActivity('The bot encountered an error or bug.');
	await context.sendActivity(`${error}`);
	await context.sendActivity('To continue to run this bot, please fix the bot source code.');

	await conversationState.delete(context);
};

const memoryStorage = new MemoryStorage();

const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

const dialog = new UserProfileDialog(userState);
const bot = new DialogBot(conversationState, userState, dialog);

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
	console.log(`\n${server.name} listening to ${server.url}.`);
	console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
	console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

server.post('/api/messages', (req, res) => {
	adapter.processActivity(req, res, async context => {
		await bot.run(context);
	});
});
