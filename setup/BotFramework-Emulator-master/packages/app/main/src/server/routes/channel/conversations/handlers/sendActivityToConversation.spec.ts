//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import * as HttpStatus from 'http-status-codes';

import { sendActivityToConversation } from './sendActivityToConversation';

jest.mock('../../../../webSocketServer', () => ({
  WebSocketServer: {
    getSocketByConversationId: () => ({
      send: jest.fn(),
    }),
  },
}));

const mockSendErrorResponse = jest.fn();
jest.mock('../../../../utils/sendErrorResponse', () => ({
  sendErrorResponse: (...args) => mockSendErrorResponse(...args),
}));

describe('sendActivityToConversation handler', () => {
  beforeEach(() => {
    mockSendErrorResponse.mockClear();
  });

  it('should send a 200 with a response from posting the activity', () => {
    const req: any = {
      body: {},
      conversation: {
        prepActivityToBeSentToUser: jest.fn(() => ({ id: 'activity1' })),
        user: {
          id: ' someUser',
        },
      },
      params: {
        activityId: 'activity1',
      },
    };
    const res: any = {
      end: jest.fn(),
      send: jest.fn(),
    };
    const next = jest.fn();
    sendActivityToConversation(req, res, next);

    expect(res.send).toHaveBeenCalledWith(HttpStatus.OK, { id: 'activity1' });
    expect(res.end).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should send an error response if something goes wrong', () => {
    const req: any = {
      body: {},
      conversation: {
        prepActivityToBeSentToUser: jest.fn(() => {
          throw new Error('Something went wrong.');
        }),
        user: {
          id: ' someUser',
        },
      },
      params: {
        activityId: 'activity1',
      },
    };
    const res: any = {};
    const next = jest.fn();
    sendActivityToConversation(req, res, next);

    expect(mockSendErrorResponse).toHaveBeenCalledWith(req, res, next, new Error('Something went wrong.'));
    expect(next).toHaveBeenCalled();
  });
});
