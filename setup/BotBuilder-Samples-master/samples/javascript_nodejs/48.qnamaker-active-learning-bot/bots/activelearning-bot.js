// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, ActivityTypes } = require('botbuilder');
const { QnAMaker } = require('botbuilder-ai');
const { DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
const { DialogHelper } = require('../Helpers/dialogHelper');

const DIALOG_STATE_PROPERTY = 'dialogState';

/**
 * A simple bot that responds to utterances with answers from QnA Maker.
 * If an answer is not found for an utterance, the bot responds with help.
 */
class QnAMakerBot extends ActivityHandler {
    /**
     * The QnAMakerBot constructor.
     * @param {ConversationState} conversationState A ConversationState object used to store dialog state.
     */
    constructor(conversationState) {
        super();

        this.conversationState = conversationState;

        // Create a property used to store dialog state.
        // See https://aka.ms/about-bot-state-accessors to learn more about bot state and state accessors.
        this.dialogState = this.conversationState.createProperty(DIALOG_STATE_PROPERTY);

        // Create a dialog set to include the dialogs used by this bot.
        this.dialogs = new DialogSet(this.dialogState);

        this.qnaMaker = new QnAMaker({
            knowledgeBaseId: process.env.QnAKnowledgebaseId,
            endpointKey: process.env.QnAEndpointKey,
            host: process.env.QnAEndpointHostName
        });

        this.qnaMakerOptions = {
            ScoreThreshold: 0.03,
            Top: 3
        };

        this.dialogHelper = new DialogHelper(this.qnaMaker);

        this.dialogs.add(this.dialogHelper.qnaMakerActiveLearningDialog);
    }

    /**
     * Every conversation turn for our QnAMakerBot will call this method.
     * There are no dialogs used, since it's "single turn" processing, meaning a single request and
     * response, with no stateful conversation.
     * @param {TurnContext} turnContext A TurnContext instance, containing all the data needed for processing the conversation turn.
     */
    async onTurn(turnContext) {
        // By checking the incoming Activity type, the bot only calls QnA Maker in appropriate cases.
        if (turnContext.activity.type === ActivityTypes.Message) {
            const dialogContext = await this.dialogs.createContext(turnContext);
            const results = await dialogContext.continueDialog();

            if ((results.status === DialogTurnStatus.cancelled) || (results.status === DialogTurnStatus.empty)) {
                await dialogContext.beginDialog(this.dialogHelper.activeLearningDialogName, this.qnaMakerOptions);
            }

            await this.conversationState.saveChanges(turnContext);

        // If the Activity is a ConversationUpdate, send a greeting message to the user.
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate &&
                   turnContext.activity.recipient.id !== turnContext.activity.membersAdded[0].id) {
            await turnContext.sendActivity('Welcome to the QnA Maker sample! Ask me a question and I will try to answer it.');

        // Respond to all other Activity types.
        } else if (turnContext.activity.type !== ActivityTypes.ConversationUpdate) {
            await turnContext.sendActivity(`[${ turnContext.activity.type }]-type activity detected.`);
        }
    }
}

module.exports.QnAMakerBot = QnAMakerBot;
