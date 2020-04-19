// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

class UserProfile {
	constructor(pLanguage, name, age, picture) {
		this.pLanguage = pLanguage;
		this.name = name;
		this.age = age;
		this.picture = picture;
	}
}

module.exports.UserProfile = UserProfile;
