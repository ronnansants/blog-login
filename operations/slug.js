const slugify = require('slugify');

function slug(word) {
    return slugify(word, { 
        lower: true,
        replacement: '-',
        remove: /[*+~.,()´`^'"!;:@#$%¨&*(){}]/g

        // /[*+~.,()'"!:@]/g
        // /[*+~.,()'"!:@#%&{}<>\[\];=\\|\/\s]/g
                
    });
}

module.exports = slug;