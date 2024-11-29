// referer-recorder.js
console.debug('Referer Recorder script loaded.');

// log http referer
const referer = document.referrer;

// log referer domain only
const refererDomain = document.referrer.split('/')[2];

//log utm_* parameters
const utm_source = getParameterByName('utm_source');
const utm_medium = getParameterByName('utm_medium');
const utm_campaign = getParameterByName('utm_campaign');
const utm_term = getParameterByName('utm_term');
const utm_content = getParameterByName('utm_content');
createCookieIfNotExists('referer', referer, 30);
createCookieIfNotExists('referer_domain', refererDomain, 30);
createCookieIfNotExists('utm_source', utm_source, 30);
createCookieIfNotExists('utm_medium', utm_medium, 30);
createCookieIfNotExists('utm_campaign', utm_campaign, 30);
createCookieIfNotExists('utm_term', utm_term, 30);
createCookieIfNotExists('utm_content', utm_content, 30);

// get URL parameter by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function createCookieIfNotExists(name, value, days) {
    //don't create if value is undefined, null or empty
    if (!value) {
        return;
    }
    
    if (getCookie(name) === null) {
        createCookie(name, value, days);
    }
}

function createCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}