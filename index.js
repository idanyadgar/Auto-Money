var screens = {
    main: 'main',
    mainTyping: 'main-typing',
    mainListening: 'main-listening',
    tripOptions: 'trip-options',
    selectedTrip: 'selected-trip',
    liveTracking: 'live-tracking',
    thankYou: 'thank-you'
};

function goToScreen(screen) {
    document.querySelectorAll('.screen').forEach(function(e) {
        e.style.display = 'none';
    });
    
    document.querySelector('#' + screen + '-screen').style.display = 'block';
}

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

document.querySelectorAll('#start').forEach(function(e) {
    e.addEventListener('click', function(e) {
        goToScreen(screens.liveTracking);

        // setTimeout(function() {
        //     goToScreen(screens.thankYou);
        // }, 7000);
    });
});

document.querySelector('#toggle-active').addEventListener('click', function(e) {
    document.getElementById('directions').classList.toggle('active');
});
