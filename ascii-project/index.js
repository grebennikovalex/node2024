const art = require('ascii-art');

art.font("PUTIN  -  DIE!!!", 'doom', (err, rendered) => {
    if (err) return;
    console.log(rendered);
});