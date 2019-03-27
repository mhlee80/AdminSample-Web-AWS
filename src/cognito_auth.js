var cognitoAuth = window.cognitoAuth || {};

(function scopeWrapper() {
    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    if (!_config.cognito.userPoolId) {
        alert("write cognito.userPoolId(aws_config.js)");
        return;
    }

    if (!_config.cognito.userPoolClientId) {
        alert("write cognito.userPoolClientId(aws_config.js)");
        return;
    }

    if (!_config.cognito.region) {
        alert("write cognito.region(aws_config.js)");
        return;
    }

    var userPool;
    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    cognitoAuth.signIn = function signIn(email, password, onSuccess, onFailure, mfaRequired, newPasswordRequired) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password
        });

        var cognitoUser = createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure,
            mfaRequired: mfaRequired,
            newPasswordRequired: newPasswordRequired
        });
    };

    cognitoAuth.changePassword = function signIn(email, originPassword, newPassword, onSuccess, onFailure) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: originPassword
        });

        var cognitoUser = createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function() {
                cognitoUser.changePassword(originPassword, newPassword, function(err, result) {
                    if (err) {
                        onFailure(err);
                        return;
                    }
                    onSuccess();
                });
            },
            onFailure: onFailure,
            mfaRequired: onFailure,
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                // the api doesn't accept this field back
                delete userAttributes.email_verified;

                // unsure about this field, but I don't send this back
                // delete userAttributes.phone_number_verified;

                cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
                    onSuccess: onSuccess,
                    onFailure: onFailure,
                });
            }
        });
    };

    cognitoAuth.signOut = function signOut() {
        userPool.getCurrentUser().signOut();
    };

    cognitoAuth.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }
    });


    /*
     * Cognito User Pool functions
     */

    // function register(email, password, onSuccess, onFailure) {
    //     var dataEmail = {
    //         Name: 'email',
    //         Value: email
    //     };
    //     var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    //
    //     userPool.signUp(email, password, [attributeEmail], null,
    //         function signUpCallback(err, result) {
    //             if (!err) {
    //                 onSuccess(result);
    //             } else {
    //                 onFailure(err);
    //             }
    //         }
    //     );
    // }

    // function signin(email, password, onSuccess, onFailure, mfaRequired, newPasswordRequired) {
    //     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    //         Username: email,
    //         Password: password
    //     });
    //
    //     var cognitoUser = createCognitoUser(email);
    //     cognitoUser.authenticateUser(authenticationDetails, {
    //         onSuccess: onSuccess,
    //         onFailure: onFailure,
    //         mfaRequired: mfaRequired,
    //         newPasswordRequired: newPasswordRequired
    //     });
    // }

    // function verify(email, code, onSuccess, onFailure) {
    //     createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
    //         if (!err) {
    //             onSuccess(result);
    //         } else {
    //             onFailure(err);
    //         }
    //     });
    // }

    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: email,
            Pool: userPool
        });
    }
}());
