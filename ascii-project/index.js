const art = require('ascii-art');

art.font("Freedom   is   slavery", 'doom', (err, rendered) => {
    if (err) return;
    console.log(rendered);
});