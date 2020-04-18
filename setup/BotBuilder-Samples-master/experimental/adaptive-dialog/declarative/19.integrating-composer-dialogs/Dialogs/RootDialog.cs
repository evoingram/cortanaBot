﻿// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.Dialogs.Adaptive;
using Microsoft.Bot.Builder.Dialogs.Declarative.Resources;
using Microsoft.Recognizers.Text;
using Newtonsoft.Json.Linq;

namespace Microsoft.BotBuilderSamples
{
    /// <summary>
    /// This is an example root dialog. Replace this with your applications.
    /// </summary>
    public class RootDialog : ComponentDialog
    {
        private IStatePropertyAccessor<JObject> _userStateAccessor;

        public RootDialog(UserState userState, ResourceExplorer resourceExplorer)
            : base("root")
        {
            _userStateAccessor = userState.CreateProperty<JObject>("result");

            // Rather than explicitly coding a Waterfall we have only to declare what properties we want collected.
            // In this example we will want two text prompts to run, one for the first name and one for the last.
            var fullname_slots = new List<SlotDetails>
            {
                new SlotDetails("first", "text", "Please enter your first name."),
                new SlotDetails("last", "text", "Please enter your last name."),
            };

            // This defines an address dialog that collects street, city and zip properties.
            var address_slots = new List<SlotDetails>
            {
                new SlotDetails("street", "text", "Please enter the street."),
                new SlotDetails("city", "text", "Please enter the city."),
                new SlotDetails("zip", "text", "Please enter the zip."),
            };

            // Dialogs can be nested and the slot filling dialog makes use of that. In this example some of the child
            // dialogs are slot filling dialogs themselves.
            var slots = new List<SlotDetails>
            {
                new SlotDetails("address", "address"),
            };

            // Add the various dialogs that will be used to the DialogSet.
            AddDialog(new SlotFillingDialog("address", address_slots));
            AddDialog(new SlotFillingDialog("fullname", fullname_slots));
            AddDialog(new TextPrompt("text"));
            AddDialog(new NumberPrompt<int>("number", defaultLocale: Culture.English));
            AddDialog(new NumberPrompt<float>("shoesize", ShoeSizeAsync, defaultLocale: Culture.English));
            AddDialog(new SlotFillingDialog("slot-dialog", slots));

            // Defines a simple two step Waterfall to test the slot dialog.
            AddDialog(new WaterfallDialog("waterfall", new WaterfallStep[] {
                StartDialogAsync,
                DoComposerDialogAsync,
                DoSlotDialogAsync,
                ProcessResultsAsync }));

            // Load and add adaptive dialog produced by composer.
            // Name of the dialog (.dialog file name) to find
            var dialogResource = resourceExplorer.GetResource("Main.dialog");
            var composerDialog = resourceExplorer.LoadType<AdaptiveDialog>(dialogResource);
            // give the dialog an ID, this defaults to the filename if missing.
            composerDialog.Id = "adaptive-main";
            // Add the dialog
            AddDialog(composerDialog);

            // The initial child Dialog to run.
            InitialDialogId = "waterfall";
        }

        private Task<bool> ShoeSizeAsync(PromptValidatorContext<float> promptContext, CancellationToken cancellationToken)
        {
            var shoesize = promptContext.Recognized.Value;

            // show sizes can range from 0 to 16
            if (shoesize >= 0 && shoesize <= 16)
            {
                // we only accept round numbers or half sizes
                if (Math.Floor(shoesize) == shoesize || Math.Floor(shoesize * 2) == shoesize * 2)
                {
                    // indicate success by returning the value
                    return Task.FromResult(true);
                }
            }

            return Task.FromResult(false);
        }

        private async Task<DialogTurnResult> StartDialogAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            // Start the child dialog. This will run the top slot dialog than will complete when all the properties are gathered.
            return await stepContext.BeginDialogAsync("fullname", null, cancellationToken);
        }

        private async Task<DialogTurnResult> DoComposerDialogAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            object adaptiveOptions = null;
            // pass prior custom dialog result as option into adaptive dialog.
            if (stepContext.Result is IDictionary<string, object> result && result.Count > 0)
            {
                adaptiveOptions = new { fullname = result };
            }
            return await stepContext.BeginDialogAsync("adaptive-main", adaptiveOptions, cancellationToken);
        }

        private async Task<DialogTurnResult> DoSlotDialogAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            if (stepContext.Result is IDictionary<string, object> result && result.Count > 0)
            {
                // get the result and persist it in user state
                var obj = await _userStateAccessor.GetAsync(stepContext.Context, () => new JObject());
                obj["data"] = new JObject
                    {
                        { "fullname",  $"{result["fullname"]}" },
                        { "shoesize", $"{result["shoesize"]}" },
                        { "userage", $"{result["userage"]}" },
                    };
            }
            return await stepContext.BeginDialogAsync("slot-dialog", null, cancellationToken);
        }

        private async Task<DialogTurnResult> ProcessResultsAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            // To demonstrate that the slot dialog collected all the properties we will echo them back to the user.
            if (stepContext.Result is IDictionary<string, object> result && result.Count > 0)
            {
                var address = (IDictionary<string, object>)result["address"];

                // Now the waterfall is complete, save the data we have gathered into UserState.
                var obj = await _userStateAccessor.GetAsync(stepContext.Context);

                obj["data"]["address"] = $"{address["street"]}, {address["city"]}, {address["zip"]}";

                await stepContext.Context.SendActivityAsync(MessageFactory.Text(obj["data"]["fullname"].Value<string>()), cancellationToken);
                await stepContext.Context.SendActivityAsync(MessageFactory.Text(obj["data"]["shoesize"].Value<string>()), cancellationToken);
                await stepContext.Context.SendActivityAsync(MessageFactory.Text(obj["data"]["address"].Value<string>()), cancellationToken);
            }

            // Remember to call EndAsync to indicate to the runtime that this is the end of our waterfall.
            return await stepContext.EndDialogAsync();
        }
    }
}
