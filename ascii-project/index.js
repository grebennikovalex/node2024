const art = require('ascii-art');

art.font("War is peace. Freedom is slavery. Ignorance is strength.", 'doom', (err, rendered) => {
    if (err) return;
    console.log(rendered);
});