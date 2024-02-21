const art = require('ascii-art');

art.font("Just a words here", 'doom', (err, rendered) => {
    if (err) return;
    console.log(rendered);
});