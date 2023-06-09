export function formatDate(date) {
    date = new Date(date);
    const diff = (new Date() - date) / 1000 + date.getTimezoneOffset() * 60;
    const hours = 3600;
    const days = hours * 24;
    const weeks = days * 7;
    const months = weeks * 4;
    const years = months * 12;
    if (diff / 60 < 1) return `${Math.floor(diff)} seconds ago`;
    else if (diff / hours < 1) return `${Math.floor(diff / 60)} ${Math.floor(diff / 60) % 10 != 1 && Math.floor(diff / 60) != 11 ? 'minutes' : 'minute'} ago`;
    else if (diff / days < 1) return `${Math.floor(diff / hours)} ${Math.floor(diff / hours) % 10 != 1 && Math.floor(diff / hours) != 11 ? 'hours' : 'hour'} ago`;
    else if (diff / weeks < 1) return `${Math.floor(diff / days)} ${Math.floor(diff / days) % 10 != 1 && Math.floor(diff / days) != 11 ? 'days' : 'day'} ago`;
    else if (diff / months < 1) return `${Math.floor(diff / weeks)} ${Math.floor(diff / weeks) % 10 != 1 && Math.floor(diff / weeks) != 11 ? 'weeks' : 'week'} ago`;
    else if (diff / years < 1) return `${Math.floor(diff / months)} ${Math.floor(diff / months) % 10 != 1 && Math.floor(diff / months) != 11 ? 'months' : 'month'} ago`;
    else return `${Math.floor(diff / years)} ${Math.floor(diff / years) % 10 != 1 && Math.floor(diff / years) != 11 ? 'years' : 'year'} ago`;
};

export function formatExactDate(date) {
    date = new Date(date);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${date.getDay()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
};

export function formatViews(views) {
    if (views < 1000) return `${views} ${views % 10 != 1 && views != 11 ? 'views' : 'view'}`;
    else if (views < 10 ** 6) return `${views / 10 ** 3 < 10 ? Math.floor(views / 10 ** 2) / 10 : Math.floor(views / 10 ** 3)}K views`;
    else return `${views / 10 ** 6 < 10 ? Math.floor(views / 10 ** 5) / 10 : Math.floor(views / 10 ** 6)}M views`;
}