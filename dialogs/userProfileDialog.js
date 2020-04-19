// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { MessageFactory } = require('botbuilder');
const {
	AttachmentPrompt,
	ChoiceFactory,
	ChoicePrompt,
	ComponentDialog,
	ConfirmPrompt,
	DialogSet,
	DialogTurnStatus,
	NumberPrompt,
	TextPrompt,
	WaterfallDialog
} = require('botbuilder-dialogs');
const { channels } = require('botbuilder-dialogs/lib/choices/channel');
const { UserProfile } = require('../userProfile');

const ATTACHMENT_PROMPT = 'ATTACHMENT_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const USER_PROFILE = 'USER_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class UserProfileDialog extends ComponentDialog {
	constructor(userState) {
		super('userProfileDialog');

		this.userProfile = userState.createProperty(USER_PROFILE);

		this.addDialog(new TextPrompt(NAME_PROMPT));
		this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
		this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
		this.addDialog(new NumberPrompt(NUMBER_PROMPT, this.agePromptValidator));
		this.addDialog(new AttachmentPrompt(ATTACHMENT_PROMPT, this.picturePromptValidator));

		this.addDialog(
			new WaterfallDialog(WATERFALL_DIALOG, [
				this.transportStep.bind(this),
				this.nameStep.bind(this),
				// this.nameConfirmStep.bind(this),
				this.ageStep.bind(this),
				this.pictureStep.bind(this),
				this.confirmStep.bind(this),
				this.summaryStep.bind(this)
			])
		);

		this.initialDialogId = WATERFALL_DIALOG;
	}

	async run(turnContext, accessor) {
		const dialogSet = new DialogSet(accessor);
		dialogSet.add(this);

		const dialogContext = await dialogSet.createContext(turnContext);
		const results = await dialogContext.continueDialog();
		if (results.status === DialogTurnStatus.empty) {
			await dialogContext.beginDialog(this.id);
		}
	}

	async transportStep(step) {
		return await step.prompt(CHOICE_PROMPT, {
			prompt: 'Please enter your preferred programming language of choice.',
			choices: ChoiceFactory.toChoices(['COBOL', 'JavaScript', 'HTML', 'Visual Basic', 'Python'])
		});
	}

	async nameStep(step) {
		step.values.transport = step.result.value;
		return await step.prompt(NAME_PROMPT, `'What's your name?`);
	}

	async nameConfirmStep(step) {
		//step.values.name = step.result;
		//return await step.prompt(CONFIRM_PROMPT, 'Do you want to give your age?', ['yes', 'no']);
	}

	async ageStep(step) {
		step.values.name = step.result;

		await step.context.sendActivity(`Thanks, ${step.result}.  Now I'm going to ask The Question.`);

		// if (step.result) {
		// User said "yes" so we will be prompting for the age.
		const promptOptions = {
			prompt: 'How old are you?',
			retryPrompt: 'Come on, your age must be greater than 0 and less than 150.'
		};

		return await step.prompt(NUMBER_PROMPT, promptOptions);
		//} else {
		// return await step.next(-1);
		//}
	}
	async pictureStep(step) {
		step.values.age = step.result;

		const msg = step.values.age === -1 ? 'No age provided.' : `You are ${step.values.age} years old.`;

		await step.context.sendActivity(msg);

		if (channels && step.context.activity.channelId === channels.msteams) {
			await step.context.sendActivity('Skipping attachment prompt in Teams channel...');
			return await step.next(undefined);
		} else {
			var promptOptions = {
				prompt: 'Please attach a picture or type any message to skip.',
				retryPrompt:
					'The attachment must be a jpeg/png image file.  It will not be saved outside of this session.  It will not be stored anywhere.'
			};

			return await step.prompt(ATTACHMENT_PROMPT, promptOptions);
		}
	}

	async confirmStep(step) {
		step.values.picture = step.result && step.result[0];
		return await step.prompt(CONFIRM_PROMPT, { prompt: 'Is this okay?' });
	}

	async summaryStep(step) {
		if (step.result) {
			const userProfile = await this.userProfile.get(step.context, new UserProfile());

			userProfile.transport = step.values.transport;
			userProfile.name = step.values.name;
			userProfile.age = step.values.age;
			userProfile.picture = step.values.picture;

			let msg = `I have your choice of programming language as ${userProfile.transport}, your name as ${userProfile.name},`;
			if (userProfile.age !== -1) {
				msg += ` and your age as ${userProfile.age}`;
			}

			msg += '.  If you like what you see, contact Erica at the link below!  Have a nice day.';
			await step.context.sendActivity(msg);
			if (userProfile.picture) {
				try {
					await step.context.sendActivity(
						MessageFactory.attachment(userProfile.picture, 'This is your profile picture.')
					);
				} catch {
					await step.context.sendActivity('A profile picture was saved but could not be displayed here.');
				}
			}
		} else {
			await step.context.sendActivity('Thanks. Your profile will not be kept.  Have a nice day!');
		}

		return await step.endDialog();
	}

	async agePromptValidator(promptContext) {
		return (
			promptContext.recognized.succeeded &&
			promptContext.recognized.value > 0 &&
			promptContext.recognized.value < 150
		);
	}

	async picturePromptValidator(promptContext) {
		if (promptContext.recognized.succeeded) {
			var attachments = promptContext.recognized.value;
			var validImages = [];

			attachments.forEach(attachment => {
				if (attachment.contentType === 'image/jpeg' || attachment.contentType === 'image/png') {
					validImages.push(attachment);
				}
			});

			promptContext.recognized.value = validImages;

			return !!validImages.length;
		} else {
			await promptContext.context.sendActivity(
				'No attachments received. Proceeding without a profile picture...'
			);

			return true;
		}
	}
}

module.exports.UserProfileDialog = UserProfileDialog;
