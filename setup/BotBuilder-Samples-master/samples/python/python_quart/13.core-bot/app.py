# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

"""
This sample shows how to create a bot that demonstrates the following:
- Use [LUIS](https://www.luis.ai) to implement core AI capabilities.
- Implement a multi-turn conversation using Dialogs.
- Handle user interruptions for such things as `Help` or `Cancel`.
- Prompt for and validate requests for information from the user.
"""

from quart import Quart, request, Response
from botbuilder.core import (
    BotFrameworkAdapterSettings,
    ConversationState,
    MemoryStorage,
    UserState,
)
from botbuilder.schema import Activity

from dialogs import MainDialog, BookingDialog
from bots import DialogAndWelcomeBot

from adapter_with_error_handler import AdapterWithErrorHandler
from flight_booking_recognizer import FlightBookingRecognizer

APP = Quart(__name__, instance_relative_config=True)
APP.config.from_object("config.DefaultConfig")

# Create adapter.
# See https://aka.ms/about-bot-adapter to learn more about how bots work.
SETTINGS = BotFrameworkAdapterSettings(APP.config["APP_ID"], APP.config["APP_PASSWORD"])

# Create MemoryStorage, UserState and ConversationState
MEMORY = MemoryStorage()
USER_STATE = UserState(MEMORY)
CONVERSATION_STATE = ConversationState(MEMORY)

# Create adapter.
# See https://aka.ms/about-bot-adapter to learn more about how bots work.
ADAPTER = AdapterWithErrorHandler(SETTINGS, CONVERSATION_STATE)

# Create dialogs and Bot
RECOGNIZER = FlightBookingRecognizer(APP.config)
BOOKING_DIALOG = BookingDialog()
DIALOG = MainDialog(RECOGNIZER, BOOKING_DIALOG)
BOT = DialogAndWelcomeBot(CONVERSATION_STATE, USER_STATE, DIALOG)


# Listen for incoming requests on /api/messages
@APP.route("/api/messages", methods=["POST"])
async def messages():
    # Main bot message handler.
    if "application/json" in request.headers["Content-Type"]:
        body = await request.json
    else:
        return Response("", status=415)

    activity = Activity().deserialize(body)
    auth_header = (
        request.headers["Authorization"] if "Authorization" in request.headers else ""
    )

    try:
        await ADAPTER.process_activity(activity, auth_header, BOT.on_turn)
        return Response("", status=201)
    except Exception as exception:
        raise exception


if __name__ == "__main__":
    try:
        APP.run(debug=False, port=APP.config["PORT"])  # nosec debug
    except Exception as exception:
        raise exception
