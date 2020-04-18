# ![Bot Framework SDK](./docs/media/BotFrameworkSDK.png)

### [Click here to find out what's new with Bot Framework](https://docs.microsoft.com/en-us/azure/bot-service/what-is-new?view=azure-bot-service-4.0)

# Bot Framework SDK

The Bot Framework SDK v4, part of the [Bot Framework](https://github.com/microsoft/botframework-sdk), provides the most comprehensive experience for building conversation applications. With the Bot Framework SDK, developers can easily model and build sophisticated conversation using their favorite programming languages. With the Bot Framework SDK, you can build bots that converse free-form or your bot can also have more guided interactions where it provides the user choices or possible actions. The conversation can use simple text or more complex rich cards that contain text, images, and action buttons. You can add natural language interactions and questions and answers, which let your users interact with your bots in a natural way.

Checkout the [Bot Framework ecosystem](#bot-framework-ecosystem) section to learn more about other tooling and services related to the Bot Framework SDK.

## Quicklinks
| [C# Repo](https://github.com/Microsoft/botbuilder-dotnet)  | [JS Repo](https://github.com/Microsoft/botbuilder-js)  | [Python Repo](https://github.com/Microsoft/botbuilder-python) |  [Java Repo](https://github.com/Microsoft/botbuilder-java) | [BF CLI](https://github.com/Microsoft/botframework-cli) | 


## Overview
The Bot Framework SDK v4 is an [open source SDK][1a] that enable developers to model and build sophisticated conversation using their favorite programming language.

|   | C#  | JS  | Python |  Java | 
|---|:---:|:---:|:------:|:-----:|
|Stable Release |[4.8][1] | [4.8][2] | [4.8][3] | [4.0.0a6 (preview)][3a]|
|Docs | [docs][5] |[docs][5] |[docs][5]  | |
|Samples |[.NET Core][6], [WebAPI][10] |[Node.js][7] , [TypeScript][8], [es6][9]  | [Python][111] | | 

[1a]:https://github.com/microsoft/botframework-sdk/#readme
[1]:https://github.com/Microsoft/botbuilder-dotnet/#packages
[2]:https://github.com/Microsoft/botbuilder-js#packages
[3]:https://github.com/Microsoft/botbuilder-python#packages
[3a]:https://github.com/Microsoft/botbuilder-java#packages
[4]:https://github.com/Microsoft/botbuilder-java#packages
[5]:https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0
[6]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore
[7]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs
[8]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/typescript_nodejs
[9]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_es6
[10]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/csharp_webapi
[111]:https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/python

<a name="V4-whats-new"></a>
### Bot Framework SDK v4 preview features

- [Adaptive Dialog][47] | [docs][48] | [C# samples][49] :: Adaptive Dialogs enable developers to build conversations that can be dynamically changed as the conversation progresses.  Traditionally developers have mapped out the entire flow of a conversation up front, which limits the flexibility of the conversation.  Adaptive dialogs allow them to be more flexible, to respond to changes in context and insert new steps or entire sub-dialogs into the conversation as it progresses. Additionally as with other SDK V4 concepts, we have defined adaptive dialogs such that they can be defined via [declarative][50] that are interpreted at runtime; which allows us to have tooling on top of this and integrate with services. 

- [Language Generation][43] | [docs][44] | [C# samples][45] :: Learning from our customers experiences and bringing together capabilities first implemented by Cortana and Cognition teams, we are introducing Language Generation; which allows the developer to extract the embedded strings from their code and resource files and manage them through a Language Generation runtime and file format.  Language Generation enable customers to define multiple variations on a phrase, execute simple expressions based on context, refer to conversational memory, and over time will enable us to bring additional capabilities all leading to a more natural conversational experience.

- [Common Expression Language][40] | [api][41] :: Both Adaptive dialogs and Language Generation rely on and use a common expression language to power bot conversations.


[40]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/common-expression-language#readme
[41]:https://github.com/Microsoft/BotBuilder-Samples/blob/master/experimental/common-expression-language/api-reference.md
[43]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/language-generation#readme
[44]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/language-generation/docs
[45]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/language-generation/csharp_dotnetcore
[46]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/language-generation/javascript_nodejs/13.core-bot
[47]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/adaptive-dialog#readme
[48]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/adaptive-dialog/docs
[49]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/adaptive-dialog/csharp_dotnetcore
[50]:https://github.com/Microsoft/BotBuilder-Samples/tree/master/experimental/adaptive-dialog/declarative



## Channels and Adapters
There are two ways to connect your bot to a client experience:
* **Azure Bot Service Channel** - Language and SDK independent support via Azure Bot Service
* **Bot Framework SDK Adapter** -  A per language Adapter component written by community

| Client          | Azure Channel  | C# Adapter        | JS Adapter        |
|-----------------|:--------------:|:-----------------:|:-----------------:|
| Microsoft Teams | [Azure][55abs] |                   |                   |
| Skype           | [Azure][55abs] |                   |                   |
| Exchange        | [Azure][55abs] |                   |                   |
| Direct Line     | [Azure][55abs] |                   |                   |
| Web Chat        | [Azure][55abs] |                   | [Botkit][55bk]    |
| Cortana         | [Azure][55abs] |                   |                   |
| Facebook        | [Azure][55abs] |  [SDK][55sdkfb]  | [Botkit][55bk]    |
| Slack           | [Azure][55abs] |  [SDK][55sdkslack]| [Botkit][55bk]    |
| Kik             | [Azure][55abs] |                   |                   |
| Telegram        | [Azure][55abs] |                   |                   |
| Line            | [Azure][55abs] |                   |                   |
| GroupMe         | [Azure][55abs] |                   |                   |
| Twilio (SMS)    | [Azure][55abs] | [SDK][55sdktwilio] | [Botkit][55bk]    |
| Alexa           |                | [Community][55cs] | [Community][55js] |
| Google Home     |                | [Community][55cs] | [Community][55js] |
| Google Hangouts |                | [Community][55cs] | [Botkit][55bk]    |
| WebEx           |                | [SDK][55sdkwebex]     | [Botkit][55bk]    |
| Console         |                |                   | [Community][55js] |

[55abs]:https://docs.microsoft.com/en-us/azure/bot-service/bot-service-manage-channels?view=azure-bot-service-4.0
[55cs]:https://github.com/BotBuilderCommunity/botbuilder-community-dotnet#adapters
[55js]:https://github.com/BotBuilderCommunity/botbuilder-community-js#adapters
[55bk]:https://github.com/howdyai/botkit#readme
[55sdkfb]:https://github.com/microsoft/botbuilder-dotnet/tree/master/libraries/Adapters/Microsoft.Bot.Builder.Adapters.Facebook
[55sdkslack]:https://github.com/microsoft/botbuilder-dotnet/tree/master/libraries/Adapters/Microsoft.Bot.Builder.Adapters.Slack
[55sdktwilio]:https://github.com/microsoft/botbuilder-dotnet/tree/master/libraries/Adapters/Microsoft.Bot.Builder.Adapters.Twilio
[55sdkwebex]:https://github.com/microsoft/botbuilder-dotnet/tree/master/libraries/Adapters/Microsoft.Bot.Builder.Adapters.Webex

## Community Extensions
Adapters and plugins from the open source community are available to extend your bot application.

|                            |       C#       | JavaScript |    Python      |    Java      |
|----------------------------|:--------------:|:----------:|:--------------:|:------------:|
| [botbuilder-community][56] | [C#][56dotnet] | [JavaScript][56js] | [Python][56py] | [Java][56ja] |
| [Botkit][56bk]             |                | [JavaScript][56bk] |                |              |

[56]:https://github.com/botbuildercommunity#readme
[56dotnet]:https://github.com/botbuildercommunity/botbuilder-community-dotnet#readme
[56js]:https://github.com/botbuildercommunity/botbuilder-community-js#readme
[56py]:https://github.com/botbuildercommunity/botbuilder-community-python#readme
[56ja]:https://github.com/botbuildercommunity/botbuilder-community-java#readme
[56bk]:https://github.com/howdyai/botkit#readme

## Questions and Help
If you have questions about Bot Framework SDK or using Azure Bot Service, we encourage you to reach out to the community and Azure Bot Service dev team for help.
- For questions which fit the Stack Overflow format ("how does this work?"), we monitor the both [Azure Bot Service](https://stackoverflow.com/questions/tagged/azure-bot-service) and [Bot Framework](https://stackoverflow.com/questions/tagged/botframework) tags (search [both](https://stackoverflow.com/questions/tagged/azure-bot-service+or+botframework))
- You can also tweet/follow [@msbotframework](https://twitter.com/msbotframework)

Join the conversation on **[Gitter](https://gitter.im/Microsoft/BotBuilder)**.

See all the support options **[here](https://docs.microsoft.com/en-us/bot-framework/resources-support)**.


## Issues and feature requests
We track functional issues and features asks for and Bot Builder and Azure Bot Service in a variety of locations. If you have found an issue or have a feature request, please submit an issue to the below repositories.

| Item&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                                                                        | Link&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| SDK v4 .NET                                                                                                            | core bot runtime for .NET, connectors, middleware, dialogs, prompts, LUIS and QnA                  | [File&nbsp;an&nbsp;issue](https://github.com/Microsoft/botbuilder-dotnet/issues)                         |
| SDK v4 JavaScript                                                                                                      | core bot runtime for Typescript/Javascript, connectors, middleware, dialogs, prompts, LUIS and QnA | [File an issue](https://github.com/Microsoft/botbuilder-js/issues)                             |
| SDK v4 Python                                                                                                          | core bot runtime for Python, connectors, middleware, dialogs, prompts, LUIS and QnA                | [File an issue](https://github.com/Microsoft/botbuilder-python/issues)                         |
| SDK v4 Java                                                                                                            | core bot runtime for Java, connectors, middleware, dialogs, prompts, LUIS and QnA                  | [File an issue]( https://github.com/Microsoft/botbuilder-java/issues)                          |


## Prior releases

- Bot Builder v3 SDK has been migrated to the [Bot Framework SDK V3](https://github.com/microsoft/botbuilder-v3) repository.
- [Botkit SDK](https://botkit.ai) is a popular SDK which joined the Microsoft Bot Framework family and is built on top of the Bot Framework SDK V4.

## Bot Framework ecosystem

- [Bot Framework Composer](#Bot-Framework-Composer)
- [Bot Framework Solutions](#Bot-Framework-Solutions)
- [Botkit](#Botkit)
- [Azure Bot Service](#Azure-Bot-Service)
- [Bot Framework Emulator](#Bot-Framework-Emulator)
- [Bot Framework Web Chat](#Bot-Framework-Web-Chat)
- [Bot Framework Tools](#Bot-Framework-CLI-Tools)
- [Language Understanding](#Language-Understanding)
- [QnA Maker](#QnA-Maker)
- [Dispatch](#Dispatch)
- [Speech Services](#Speech-Services)  
- [Adaptive cards](#Adaptive-Cards)
- [Analytics](#Analytics)

### Bot Framework Composer
[Bot Framework Composer (Preview)](https://github.com/microsoft/BotFramework-Composer/blob/stable/README.md) is an integrated development tool for developers and multi-disciplinary teams to build bots and conversational experiences with the Microsoft Bot Framework. Within this tool, you'll find everything you need to build a sophisticated conversational experience.

### Botkit
[Botkit][100] is a developer tool and SDK for building chat bots, apps and custom integrations for major messaging platforms. Botkit bots `hear()` triggers, `ask()` questions and `say()` replies. Developers can use this syntax to build dialogs - now cross compatible with the latest version of Bot Framework SDK. 

In addition, Botkit brings with it 6 platform adapters allowing Javascript bot applications to communicate directly with messaging platforms: [Slack][102], [Webex Teams][103], [Google Hangouts][104], [Facebook Messenger][105], [Twilio][106], and [Web chat][107].

Botkit is part of Microsoft Bot Framework and is released under the [MIT Open Source license][101]

[100]:https://github.com/howdyai/botkit#readme
[101]:https://github.com/howdyai/botkit/blob/master/LICENSE.md
[102]:https://github.com/howdyai/botkit/tree/master/packages/botbuilder-adapter-slack#readme
[103]:https://github.com/howdyai/botkit/tree/master/packages/botbuilder-adapter-webex#readme
[104]:https://github.com/howdyai/botkit/tree/master/packages/botbuilder-adapter-hangouts#readme
[105]:https://github.com/howdyai/botkit/tree/master/packages/botbuilder-adapter-facebook#readme
[106]:https://github.com/howdyai/botkit/tree/master/packages/botbuilder-adapter-twilio-sms#readme
[107]:https://github.com/howdyai/botkit/tree/master/packages/botbuilder-adapter-web#readme

### Bot Framework Solutions (Preview)

The [Bot Framework Solutions repository](https://github.com/Microsoft/botframework-solutions#readme) provides a set of templates, solution accelerators and skills to help build sophisticated conversational experiences.

<a name="Solutions-whats-new"></a>

- [**Virtual Assistant.**](https://aka.ms/bfvadocs) Customers and partners have a significant need to deliver a conversational assistant tailored to their brand, personalized to their users, and made available across a broad range of canvases and devices. <br/><br/>  This brings together all of the supporting components and greatly simplifies the creation of a new bot project including: basic conversational intents, Dispatch integration, QnA Maker, Application Insights and an automated deployment.

- [**Skills.**](https://aka.ms/bfskillsdocs) A library of re-usable conversational skill building-blocks enabling you to add functionality to a Bot. We currently provide: Calendar, Email, Task, Point of Interest, Automotive, Weather and News skills. Skills include LUIS models, Dialogs, and integration code delivered in source code form to customize and extend as required.

- [**Analytics.**](https://github.com/Microsoft/AI/blob/master/docs/readme.md#analytics) Gain key insights into your bot’s health and behavior with the Bot Framework Analytics solutions, which includes: sample Application Insights queries, and Power BI dashboards to understand the full breadth of your bot’s conversations with users.

### Azure Bot Service
Azure Bot Service enables you to host intelligent, enterprise-grade bots with complete ownership and control of your data. Developers can register and connect their bots to users on Skype, Microsoft Teams, Cortana, Web Chat, and more. [[Docs][28]]

* **Direct Line JS Client**: If you want to use the Direct Line channel in Azure Bot Service and are not using the WebChat client, the Direct Line JS client can be used in your custom application. [[Readme][30]]

<a name="ABS-whats-new"></a>

* **Direct Line Speech Channel**: We are bringing together the Bot Framework and Microsoft's Speech Services to provide a channel that enables streamed speech and text bi-directionally from the client to the bot application.  To sign up, add the 'Direct Line Speech' channel to your Azure Bot Service.

[27]:https://azure.microsoft.com/en-us/services/bot-service/
[28]:https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0
[29]:https://docs.microsoft.com/en-us/azure/bot-service/bot-service-manage-channels?view=azure-bot-service-4.0
[30]:https://github.com/Microsoft/BotFramework-DirectLineJS/blob/master/README.md

* **Better isolation for your Bot - Direct Line App Service Extension** : The Direct Line App Service Extension can be deployed as part of a VNET, allowing IT administrators to have more control over conversation traffic and improved latency in conversations due to reduction in the number of hops. Get started with Direct Line App Service Extension here. A VNET lets you create your own private space in Azure and is crucial to your cloud network as it offers isolation, segmentation, and other key benefits. 

### Bot Framework Emulator
The [Bot Framework Emulator][60] is a  cross-platform desktop application that allows bot developers to test and debug bots built using the Bot Framework SDK. You can use the Bot Framework Emulator to test bots running locally on your machine or to connect to bots running remotely. [[Download latest][61] | [Docs][62]]

[60]:https://github.com/Microsoft/BotFramework-Emulator#readme
[61]:https://github.com/Microsoft/BotFramework-Emulator/releases/latest
[62]:https://docs.microsoft.com/en-us/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0

### Bot Framework Web Chat
The Bot Framework [Web Chat][23] is a highly customizable web-based client chat control for Azure Bot Service that provides the ability for users to interact with your bot directly in a web page. [[Stable release][24] | [Docs][25]  | [Samples][26]]

[23]:https://github.com/Microsoft/BotFramework-WebChat#readme
[24]:https://www.npmjs.com/package/botframework-webchat
[25]:https://github.com/Microsoft/BotFramework-WebChat/tree/master/doc
[26]:https://github.com/Microsoft/BotFramework-WebChat/tree/master/samples


### Bot Framework CLI Tools
The Bot Framework CLI Tools is an [open source](https://github.com/microsoft/botframework-cli) collection of cross-platform command line tools designed to support building robust end-to-end development workflows. The new Bot Framework CLI tool replaces legacy standalone tools used to manage bots and related services. We've ported most of the tools and are in the process of porting the rest of them. BF CLI aggregates the collection of cross-platform tools into one cohesive and consistent interface.

## Related Services

### Language Understanding 
A machine learning-based service to build natural language experiences. Quickly create enterprise-ready, custom models that continuously improve. Language Understanding Service(LUIS) allows your application to understand what a person wants in their own words. [[Docs][31] | [Add language understanding to your bot][32]]

[18]:https://github.com/Microsoft/botbuilder-tools/tree/master/packages/LUIS#readme
[19]:https://github.com/Microsoft/botbuilder-tools/tree/master/packages/QnAMaker#readme
[30]:https://www.luis.ai
[31]:https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/Home
[32]:https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-v4-luis?view=azure-bot-service-4.0&branch=pr-en-us-1325&tabs=csharp

### QnA Maker
[QnA Maker][33] is a cloud-based API service that creates a conversational, question-and-answer layer over your data. With QnA Maker, you can build, train and publish a simple question and answer bot based on FAQ URLs, structured documents, product manuals or editorial content in minutes. [[Docs][34]  | [Add qnamaker to your bot][35]]

[33]:https://www.qnamaker.ai/
[34]:https://aka.ms/qnamaker-docs-home
[35]:https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-qna?view=azure-bot-service-4.0&branch=pr-en-us-1325&tabs=cs

### Dispatch
Dispatch tool lets you build language models that allow you to dispatch between disparate components (such as QnA, LUIS and custom code). [[Readme](https://github.com/Microsoft/botbuilder-tools/blob/master/packages/Dispatch#readme)]

### Speech Services
Speech Services convert audio to text, perform speech translation and text-to-speech with the unified Speech services. With the speech services, you can integrate speech into your bot, create custom wake words, and author in multiple languages. [[Docs](https://azure.microsoft.com/en-us/services/cognitive-services/speech-services/)]

### Adaptive Cards
[Adaptive Cards](https://adaptivecards.io) are an open standard for developers to exchange card content in a common and consistent way, 
and are used by Bot Framework developers to create great cross-channel conversatational experiences.

* **Open framework, native performance** - A simple open card format enables an ecosystem of shared tooling, seamless integration between apps, and native cross-platform performance on any device.
* **Speech enabled from day one** - We live in an exciting era where users can talk to their devices. Adaptive Cards embrace this new world and were designed from the ground up to support these new experiences.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Reporting Security Issues
Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) at [secure@microsoft.com](mailto:secure@microsoft.com). You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the [MSRC PGP](https://technet.microsoft.com/en-us/security/dn606155) key, can be found in the [Security TechCenter](https://technet.microsoft.com/en-us/security/default).

Copyright (c) Microsoft Corporation. All rights reserved.
