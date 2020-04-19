
const { ActivityHandler, TurnContext, ActivityTypes } = require('botbuilder');
const { DialogSet, WaterfallDialog, TextPrompt, Dialog } = require('botbuilder-dialogs');

const TURN_COUNTER_PROPERTY = 'turnCounterProperty';
const DIALOG_STATE_ACCESSOR = 'dialogStateAccessor';
const USER_NAME_PROP = 'user_name';
const WHO_ARE_YOU = 'who_are_you';
const HELLO_USER = 'hello_user';
const NAME_PROMPT = 'name_prompt';

class EchoBot extends ActivityHandler {
	constructor(conversationState, userState) {
		super();
		this.userState = userState;
		this.conversationState = conversationState;
		this.countProperty = this.conversationState.createProperty(TURN_COUNTER_PROPERTY);
		this.dialogStateAccessor = this.conversationState.createProperty(DIALOG_STATE_ACCESSOR);
		this.userName = this.userState.createProperty(USER_NAME_PROP);

		this.dialogs = new DialogSet(this.dialogStateAccessor);

		this.dialogs.add(new TextPrompt(NAME_PROMPT));

		this.dialogs.add(
			new WaterfallDialog(WHO_ARE_YOU, [this.askForName.bind(this), this.collectAndDisplayName.bind(this)])
		);
		this.dialogs.add(new WaterfallDialog(HELLO_USER, [this.displayName.bind(this)]));

		/*
		this.onMessage(async (context, next) => {
			await context.sendActivity(`You said '${context.activity.text}'`, `You said '${context.activity.text}'`);

			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onMembersAdded(async (context, next) => {
			const membersAdded = context.activity.membersAdded;
			for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
				if (membersAdded[cnt].id !== context.activity.recipient.id) {
					await context.sendActivity('Hello and welcome!', 'Hello and welcome!');
				}
			}
			// By calling next() you ensure that the next BotHandler is run.
			await next();
        });
        */
	}

	// first step in waterfall asks user for name
	async askForName(dc) {
		await dc.prompt(NAME_PROMPT, `What is your name, human?`);
	}

	// second step in waterfall collects response, stores in state accessor, displays it
	async collectAndDisplayName(step) {
		await this.userName.set(step.context, step.result);
		await step.context.sendActivity(`Got it.  Your name is ${step.result}`);
		await step.endDialog();
	}

	async displayName(step) {
		const userName = await this.userName.get(step.context, null);
		await step.context.sendActivity(`Your name is ${username}`);
		await step.endDialog();
	}
	// use to handle incoming activity, received from user, process & reply as necessary
	async onTurn(turnContext) {
		if (turnContext.activity.type === ActivityTypes.Message) {
			// create dialog context
			const dc = await this.dialogs.createContext(turnContext);

			// continue current dialog
			if (!turnContext.responded) {
				await dc.continueDialog();
			}

			// show menu if no response sent
			if (!turnContext.responded) {
				const userName = await this.userName.get(dc.context, null);
				if (userName) {
					await dc.beginDialog(HELLO_USER);
				} else {
					await dc.beginDialog(WHO_ARE_YOU);
				}
			}

			// read from state
			let count = await this.countProperty.get(turnContext);
			count = count === undefined ? 1 : ++count;
			let msg = `${count}:  You said "${turnContext.activity.text}" some !`;

			// await turnContext.sendActivity(msg, msg);

			// increment and set turn counter
			await this.countProperty.set(turnContext, count);
		} else {
			// generic handler for all other activity types
			await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
		}
		// save state changes
		await this.conversationState.saveChanges(turnContext);

		// save changes to the username
		await this.userState.saveChanges(turnContext);
	}
}

module.exports.EchoBot = EchoBot;
