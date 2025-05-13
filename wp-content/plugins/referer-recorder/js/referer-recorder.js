// referer-recorder.js
console.debug('Referer Recorder script loaded.');

// log http referer
const referer = document.referrer;

// log referer domain only
const referer_domain = document.referrer.split('/')[2];


// utms to log
//log utm_* parameters
const cookies_to_create = ['referer', 'referer_domain', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
let should_create = true;
for (let i = 0; i < cookies_to_create.length; i++) {
    //if one of the cookie exists, do not create anything
    if (getCookie(cookies_to_create[i]) !== null) {
        // console.debug('Cookie ' + cookies_to_create[i] + ' already exists. Not creating.');
        should_create = false;
        break;
    }
}

const utm_source = getParameterByName('utm_source');
const utm_medium = getParameterByName('utm_medium');
const utm_campaign = getParameterByName('utm_campaign');
const utm_term = getParameterByName('utm_term');
const utm_content = getParameterByName('utm_content');

/*
createCookieIfNotExists('referer', referer, 30);
createCookieIfNotExists('referer_domain', referer_domain, 30);
createCookieIfNotExists('utm_source', utm_source, 30);
createCookieIfNotExists('utm_medium', utm_medium, 30);
createCookieIfNotExists('utm_campaign', utm_campaign, 30);
createCookieIfNotExists('utm_term', utm_term, 30);
createCookieIfNotExists('utm_content', utm_content, 30);
*/


if (should_create) {
    console.debug('Creating cookies.');
    for (let i = 0; i < cookies_to_create.length; i++) {
        if (getCookie(cookies_to_create[i]) === null) {
            // console.debug('Creating cookie ' + cookies_to_create[i]);
            createCookieIfNotExists(cookies_to_create[i], eval(cookies_to_create[i]), 30);
        }
    }
}

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
