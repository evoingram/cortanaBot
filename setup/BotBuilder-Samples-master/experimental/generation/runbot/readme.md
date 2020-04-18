﻿# RunBot

This bot allows you to easily run Bot Framework Adaptive Dialog declarative samples that use only standard SDK components.
It starts a web server you can connect the emulator to `http://localhost:5000/api/messages` to interact with your bot.
If you're using this bot as part of the dialog generation flow, see [Dialog Generation][generation] for complete documentation.  

## Setup

In order to setup runbot:

1. Ensure you have the [dotnet] runtime installed on your machine.
2. Ensure you have [git] installed on your machine.
3. Open a shell window:
   1. Switch to where you want the repo located.
   2. `git clone https://github.com/microsoft/BotBuilder-Samples.git`
4. To use LUIS you need to register your LUIS endpoint key by doing `dotnet user-secrets --id RunBot set luis:endpointKey <yourKey>` once.

## Usage

In order to use runbot, you execute the command `dotnet run <pathToRepo>/experimental/generation/runbot/runbot.csproj --root <directoryWithDeclarativeAssets>`.
At that point you can connect to your bot using `http://localhost:5000/api/messages` in the [Bot Framework Emulator][emulator].

Command line args:

* **--root <PATH>**: Absolute path to the root directory for declarative resources all *.main.dialog be options.  Default current directory");
* **--region <REGION>**: LUIS endpoint region.  Default westus");
* **--environment <ENVIRONMENT>**: LUIS environment settings to use.
  Default is user alias.
  This is used to find your `luis.settings.<environment>.<region>.json` settings file for luis.

## Troubleshooting

* **Missing LUIS endpoint key**: If you are unable to interact with LUIS, check to ensure that the same LUIS key was used when doing `bf luis:build` as in `luis:endpointKey` from `dotnet user-secrets list --id RunBot`.
* **Missing LUIS app ID**: If you are missing an appid, most likely you did not run `bf luis:build` to build your LUIS model.

[dotnet]:https://dotnet.microsoft.com/download
[git]:https://git-scm.com/downloads
[samples]:https://github.com/microsoft/BotBuilder-Samples.git
[emulator]:https://github.com/Microsoft/BotFramework-Emulator
[generation]:https://github.com/microsoft/BotBuilder-Samples/tree/master/experimental/generation/generator
