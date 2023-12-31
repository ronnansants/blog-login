const slugify = require('slugify');

function slug(word) {
    return slugify(word, { 
        lower: true,
        remove: /[*+~.,()'"!:@#%&{}<>\[\];=\\|\/\s]/g
        ///[*+~.,()'"!:@]/g
    });
}

module.exports = slug;