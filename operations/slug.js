const slugify = require('slugify');

function slug(word) {
    return slugify(word, { 
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });
}

module.exports = slug;