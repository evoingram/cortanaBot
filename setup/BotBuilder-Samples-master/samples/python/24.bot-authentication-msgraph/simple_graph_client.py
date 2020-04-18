# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import json
from urllib.parse import urlparse, urljoin

from requests_oauthlib import OAuth2Session

AUTHORITY_URL = "https://login.microsoftonline.com/common"
RESOURCE = "https://graph.microsoft.com"
API_VERSION = "beta"


class SimpleGraphClient:
    def __init__(self, token: str):
        self.token = token
        self.client = OAuth2Session(
            token={"access_token": token, "token_type": "Bearer"}
        )

    async def send_mail(self, to_address: str, subject: str, content: str):
        # Create recipient list in required format.
        recipient_list = [{"EmailAddress": {"Address": to_address}}]

        # Create email message in required format.
        email_msg = {
            "Message": {
                "Subject": subject,
                "Body": {"ContentType": "Text", "Content": content},
                "ToRecipients": recipient_list,
            }
        }

        # Do a POST to Graph's sendMail API and return the response.
        return self.client.post(
            self.api_endpoint("me/sendMail"),
            headers={"Content-Type": "application/json"},
            json=email_msg,
        )

    async def get_me(self) -> {}:
        response = self.client.get(self.api_endpoint("me"))
        return json.loads(response.text)

    async def get_recent_mail(self):
        response = self.client.get(self.api_endpoint("me/messages"))
        return json.loads(response.text)["value"]

    def api_endpoint(self, url):
        """Convert a relative path such as /me/photo/$value to a full URI based
        on the current RESOURCE and API_VERSION settings in config.py.
        """
        if urlparse(url).scheme in ["http", "https"]:
            return url  # url is already complete
        return urljoin(f"{RESOURCE}/{API_VERSION}/", url.lstrip("/"))
