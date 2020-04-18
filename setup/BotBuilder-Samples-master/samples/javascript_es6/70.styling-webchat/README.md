# styling webchat sample

Bot Framework v4 styling webchat sample

This sample shows how to create a web page with customized [Web Chat](https://github.com/Microsoft/BotFramework-WebChat/) component.

![Screenshot of styled Web Chat](https://raw.githubusercontent.com/Microsoft/BotBuilder-Samples/master/samples/javascript_es6/70.styling-webchat/screenshot.png)

> You will need to obtain bot secret from a bot hosted on Azure Bot Services. You can follow this [article](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-webchat?view=azure-bot-service-3.0#step-1) to get the bot secret key.

> To communicate with your bot securely, you will need to obtain a token from your implemented token server. To learn more about the differences between secrets and tokens, and to understand the risks associated with using secrets, read the [article on authentication](https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0). *For simplicity, this sample does not show an implementation of a token server*.

- Clone this repository

   ```sh
   git clone https://github.com/Microsoft/BotBuilder-Samples.git
   ```

- In a terminal,

   ```sh
   cd samples/javascript_es6/70.styling-webchat
   ```

- In [`index.html`](https://github.com/Microsoft/BotBuilder-Samples/tree/v4/samples/javascript_es6/70.styling-webchat), put your bot secret key by replacing `YOUR_BOT_SECRET_FROM_AZURE` with the key. 

> Note: Reminder that using your secret to communicate with the bot is not secure, and we reccommend implementing a token server. Please see the notes above on authentication.

- Host it using [`serve`](https://npmjs.com/package/serve)

   ```sh
   npx serve
   ```

- Navigate to the page at [http://localhost:5000](http://localhost:5000/)

## Web Chat

Web Chat is a highly-customizable web-based client for Azure Bot Services. It can be integrated with your existing web site using JavaScript and React. In this sample, we are customizing Web Chat using JavaScript without any UI frameworks. For deep-customizations, Web Chat can be rebuilt using React to suit your need.

## Further Reading

- [Bot Framework Documentation](https://docs.botframework.com/)
- [Web Chat GitHub repository](https://github.com/Microsoft/BotFramework-WebChat)
- [Connect a bot to Web Chat](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-webchat?view=azure-bot-service-3.0#step-1)
- [Customizing Web Chat](https://github.com/microsoft/BotFramework-WebChat/blob/master/SAMPLES.md)
