# Adaptive Dialog *[RC0]*

> See [here](#Change-Log) for what's new in **4.8 RC0** release. RC0 = Release Candidate 0.

**Pre-read:** [Dialogs library][1] in Bot Framework V4 SDK.

Dialogs are a central concept in the Bot Framework SDK, and provide a way to manage a conversation with the user. Bot Framework V4 SDK Dialogs library offers [waterfall dialogs][3], [prompts][2] and [component dialogs][4] as built-in constructs to model conversations via Dialogs. These set of dialog types offered by the SDK put you in control of managing your bot's conversations. However, they also require you to write a bunch of boiler plate code for sophisticated conversation modelling concepts like building a dialog dispatcher, ability to handle interruptions elegantly and to build a pluggable, extensible dialog system.

The new **Adaptive dialog** is a new way to model conversations that takes the best of waterfall dialogs and prompts and simplifies sophisticated conversation modelling primitives like building a dialog dispatcher and ability to handle interruptions elegantly. The new **Adaptive dialog** and the event model simplify sophisticated conversation modelling primitives, eliminate much of the boiler plate code and helps you focus on the model of the conversation rather than the mechanics of dialog management. An Adaptive dialog is a derivative of a Dialog and interacts with the rest of the SDK dialog system.

We set out with the following goals for Adaptive dialogs - 
* It enables you to think and model conversations as a sequence of steps but allows for rules to **dynamically adjust to context** - especially when users do not provide requested information in order, want to start a new conversation about something else while they are in the middle of an active dialog, etc. 
* It supports and sits on top of a **rich event system** for dialogs and so modelling interruptions, cancellation and execution planning semantics are lot easier to describe and manage.
* It brings input recognition, event handling via rules, model of the conversation (dialog) and output generation into one **cohesive, self-contained** unit. 
* It supports **extensibility** points for recognition, event rules and machine learning.
* It was designed to be **declarative** from the start

To get started, you can check out the various samples [here][5]. The following are additional documents to help you get oriented with some of the new concept introduced with Adaptive dialogs:  
1. [Quick Start](#Quick-Start)
2. [New memory model overview][6]
3. [Adaptive dialogs - anatomy][7]
4. [Adaptive dialogs - runtime behavior][8]
5. [Recognizers, Generators, Triggers and Actions - references][9]
6. [Language generation][17]
7. [Debugging Adaptive Dialog][10]
8. [Declarative Adaptive Dialog][19]
9. [Generating Dialogs from Schemas][33]
10. [Packages](#Packages-and-source-code)
11. [Reporting issues](#Reporting-issues)
12. [Change Log](#change-log)

## Packages and source code
Packages for C# are available on [BotBuilder MyGet][14]. We will update this section once packages for JS is available.
Source code: 
- [C# repository][15]
- [JS repository][16]

## Reporting issues
You can report any issues you find or feature suggestions on our GitHub repositories
- [BotBuilder C# GitHub repository][12]
- [BotBuilder JS GitHub repository][13]

## Debugging Adaptive Dialog
You can use this [Visual studio code debugger extension][18] to debug both code based as well as declaratively defined Adaptive Dialogs.

## Change Log
### 4.8 RC
- \[**NEW**\] 
   - New samples: 
      - [C#][s1-c#] Getting waterfall, custom and adaptive dialogs to work in harmony
      - [C#][s2-c#] Integrating [Composer][composer] generated dialogs with existing V4 bots.
   - [Adaptive actions][aa]: SetProperties, DeleteProperties, BreakLoop, ContinueLoop, DeleteActivity, GetActivityMembers, GetConversationMembers, GotoAction, SignOutUser, UpdateActivity 
   - [Adaptive recognizers][ar]: CrossTrainedRecognizerSet, RecognizerSet, ValueRecognizer, QnAMakerRecognizer
   - New triggers - OnQnAMatch, OnChooseIntent.
   - Adaptive dialogs now participate in being able instrument runtime operations to telemetry client.
   - You can now simply use `SetProperty` or `SetProperties` action to initialize and empty array or object. Set to `={}` for object and `=[]` for array.
- \[**BREAKING CHANGES**\]
   - See [here][b1] for breaking changes related to language generation and adaptive expressions.
   - Bounding character for expressions has been changed from **@**{expression} to **$**{expression}

    |  Old  | New |
    |-------|-----|
    | new SendActivity("I have @{user.name}") | new SendActivity("I have ${user.name}") |
    | new SendActivity("@{lgTemplateFoo()}") | new SendActivity("${lgTemplateFoo()}") |

   - Properties that accept expressions now have updated usage pattern 

   ```C#
      // user.name set to string `vishwac`
      new SetProperty()
      {
         Property = "user.name",
         Value = "Vishwac"
      }

      // user.name set to string `@userName`
      new SetProperty()
      {
         Property = "user.name",
         Value = "@userName"
      }

      // user.name set to the outcome of evaluating the expression '@userName'. 
      // If expression evaluates to 
      //    - string, user.name is set to that string; 
      //    - object, then user.name set to that object etc.
      new SetProperty()
      {
         Property = "user.name",
         Value = "=@userName"
      }

      // user.name set to string interpolated value contained in @userName. 
      // Note: If @userName evaluated to an object, user.name will have the **string** represenatation of the object
      new SetProperty()
      {
         Property = "user.name",
         Value = "${@userName}"
      }

      // string interpolation
      new SetProperty()
      {
         Property = "user.name",
         Value = "${name : @userName}"
      }
   ```
   - CodeActions now expected to call endDialog when they are done.

   | Old | New | 
   |-----|-----|
   | return new DialogTurnResult(DialogTurnStatus.Complete, options); | return await dc.EndDialogAsync(options) |

   - `UseLanguageGeneration` moved off adapter to `DialogManager`
   - `UseResourceExplorer` moved off adapter to `DialogManager`
   - Use `LuisAdaptiveRecognizer` when for LUIS recognizer in adaptive dialogs
   


### 4.7 PREVIEW
- \[**New\] Language Generation integration has been refactored to work better with Adaptive dialogs.
- \[**BREAKING CHANGES**\]
    - Declarative schema for all components has been updated to now refer to `$type` -> `$kind`.
    - `ActivityBuilder.GenerateFromLG` has been removed and replaced with `ActivityFactory.CreateActivity`
    - Expressions now require to be prefixed with `@`. Refer to [Language generation][32] to learn more
### 4.6 PREVIEW 2
- \[**New\] Adaptive dialogs have been merged into `botbuilder-dotnet` master branch and now is built on top of the core SDK.
- \[**New\] RegexRecognizer now supports entity extractors. See [here][31] for supported entity recognizers.
- \[***BREAKING CHANGES***\] 
  - Renamed `Steps` -> `Actions`.
  - `Actions` are now `List<Dialog>` (instead of `List<IDialog>`)
  - Renamed `Rules` -> `Triggers`. 
  - `Triggers` are now `List<OnCondition>` (instead of `List<IRule>`)
  - Updated all triggers to follow `OnXXX` notation. 
  - Adaptive dialogs no longer have `Steps` tied directly to them. If you need to run a set of actions when a dialog begins, add them to the `OnBeginDialog` trigger.
  - Renamed, updated and streamlined properties for actions - e.g. `ItemsProperty`, `ResultProperty` and `Property` are consistently available where applicable (EditArray, EndDialog etc)
  - `AllowInterruption` property for all `Input actions` is now an expression, providing you more fine grained control of when you want to allow interruptions.

### 4.6 PREVIEW
- \[**New\] DialogManager class to help manage state persistance for Adaptive dialogs as well as ensure appropriate events are registered and routed. See [here][30] for how this gets wired up. 
- \[**New\] Generator property on Adaptive dialog that defines the specific language generation resources that power a particular Adaptive dialog. 
- \[**New\] ConversationUpdateActivityRule to help welcome users
- Several updates to steps. Notable ones include
    - SwitchCondition step - Removed need to enclose cases in ‘’
    - IfCondition step
         - Condition no longer needs an expression().parse()
    - Normalized all input steps properties
    - \[**New\] steps include EmitEvent, DateTimeInput, OAuthInput, EditSteps, DebugBreak, ForEach, ForEachPage

### 4.5 PREVIEW
- Initial preview release

[1]:https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0
[2]:https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0#prompts
[3]:https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0#waterfall-dialogs
[4]:https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0#component-dialog
[5]:./csharp_dotnetcore
[6]:./docs/memory-model-overview.md
[7]:./docs/anatomy-and-runtime-behavior.md#anatomy-adaptive-dialog
[8]:./docs/anatomy-and-runtime-behavior.md#runtime-behavior-adaptive-dialog
[9]:./docs/recognizers-rules-steps-reference.md
[10]:#Debugging-Adaptive-Dialog
[12]:https://github.com/microsoft/botbuilder-dotnet/issues
[13]:https://github.com/microsoft/botbuilder-js/issues
[14]:https://botbuilder.myget.org/gallery/botbuilder-v4-dotnet-daily
[15]:https://github.com/microsoft/botbuilder-dotnet
[16]:https://github.com/microsoft/botbuilder-js/tree/4.future
[17]:./docs/language-generation.md
[18]:https://marketplace.visualstudio.com/items?itemName=tomlm.vscode-dialog-debugger
[19]:./declarative/60.AdaptiveBot/
[30]:./csharp_dotnetcore/todo-bot/Bots/DialogBot.cs
[31]:https://github.com/microsoft/botbuilder-dotnet/tree/master/libraries/Microsoft.Bot.Builder.Dialogs.Adaptive/Recognizers/EntityRecognizers
[32]:../language-generation/README.md#4.7-PREVIEW
[33]:./docs/generating-dialogs.md
[b1]:../language-generation/README.md#Change-Log
[ar]:./docs/recognizers-rules-steps-reference.md#Recognizers
[aa]:./docs/recognizers-rules-steps-reference.md#Actions
[s1-c#]:./csharp_dotnetcore/19.waterfall-or-custom-dialog-with-adaptive/README.md
[s2-c#]:./declarative/19.integrating-composer-dialogs/README.md