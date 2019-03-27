var router = {};

(function scopeWrapper() {
    router.launchIndex = function() {
        window.location.href = "index.html";
    };

    router.launchSignIn = function() {
        window.location.href = "sign_in.html";
    };

    router.launchChangePassword = function () {
        window.location.href = "change_password.html";
    };
}());
