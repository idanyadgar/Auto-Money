var screens = {
    main: 'main',
    mainTyping: 'main-typing',
    mainListening: 'main-listening',
    tripOptions: 'trip-options',
    selectedTrip: 'selected-trip',
    liveTracking: 'live-tracking',
    thankYou: 'thank-you'
};

var screensHistory = [];

function goToScreen(screen) {
    document.querySelectorAll('.screen').forEach(function(e) {
        e.classList.remove('active');
    });
    
    document.querySelector('#' + screen + '-screen').classList.add('active');

    screensHistory.push(screen);
}

function goBack() {
    if (screensHistory.length < 2) {
        return;
    }

    screensHistory.pop();

    var lastScreen = screensHistory.pop();
    goToScreen(lastScreen.startsWith('main-') ? screens.main : lastScreen);
}

function toggleSideMenu() {
    document.getElementById('side-menu').classList.toggle('active');
}

setTimeout(function() {
    goToScreen(screens.main);

    setTimeout(function() {
        document.getElementById('main-screen').classList.remove('animate-fade');
    }, 1000);
}, 5000);

document.getElementById('back').addEventListener('click', goBack);
document.getElementById('menu-button').addEventListener('click', toggleSideMenu);

document.getElementById('cancel-typing').addEventListener('click', function() {
    goToScreen(screens.main);
});

document.querySelectorAll('.search-box').forEach(function(e) {
    e.addEventListener('click', function(e) {
        goToScreen(screens.mainTyping);
    });
});

document.querySelectorAll('.microphone').forEach(function(e) {
    e.addEventListener('click', function(e) {
        e.stopPropagation();

        goToScreen(screens.mainListening);
        setTimeout(function() {
            goToScreen(screens.mainTyping);
        }, 3000);
    });
});

document.querySelector('#results').addEventListener('click', function(e) {
    goToScreen(screens.tripOptions);
});

document.querySelectorAll('#favorites > .box').forEach(function(e) {
    e.addEventListener('click', function(e) {
        goToScreen(screens.tripOptions);
    });
});

document.querySelectorAll('#trip-options > .box').forEach(function(e) {
    e.addEventListener('click', function(e) {
        goToScreen(screens.selectedTrip);
    });
});

document.querySelectorAll('#different-trip').forEach(function(e) {
    e.addEventListener('click', function(e) {
        goToScreen(screens.tripOptions);
    });
});

var goToThankYouTimeout, countDownInterval, tripETA = 7;
document.querySelector('#start').addEventListener('click', function(e) {
    goToScreen(screens.liveTracking);

    goToThankYouTimeout = setTimeout(function() {
        clearInterval(countDownInterval);

        goToScreen(screens.thankYou);
    }, tripETA * 1000);

    document.querySelector('#eta span').innerHTML = tripETA;

    let currentETA = tripETA;
    countDownInterval = setInterval(function() {
        document.querySelector('#eta span').innerHTML = --currentETA;
    }, 1000);
});

document.getElementById('back').addEventListener('click', function() {
    clearTimeout(goToThankYouTimeout);
    clearInterval(countDownInterval);
});

document.querySelector('#toggle-active').addEventListener('click', function(e) {
    document.getElementById('directions').classList.toggle('active');
});

document.querySelectorAll('.rating').forEach(function(e) {
    e.addEventListener('click', function(e) {
        document.querySelectorAll('.rating').forEach(function(e) {
            e.classList.remove('selected');
        });

        e.currentTarget.classList.toggle('selected');
    });
});

document.querySelector('#plan-another-trip').addEventListener('click', function(e) {
    goToScreen(screens.main);
});
