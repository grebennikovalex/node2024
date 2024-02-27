const art = require('ascii-art');

art.font("War   is   peace", 'doom', (err, rendered) => {
    if (err) return;
    console.log(rendered);
});