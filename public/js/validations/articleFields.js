
//validate title, body and category of article
let btnSend = document.getElementById('sendArticle');
    
btnSend.addEventListener('click', function(event){
    let title = document.getElementById('articleTitle').value.trim();

    //tinyMCE
    let body = tinymce.get('articleBody');
    let category = document.getElementsByName('articleCategory')[0].value;
    let msg = "";
    
    if (title.length < 7 ){
        msg += "Title must be higher, with a minimum of 8 characters.\n\n";
    }

    //body article
    let wordCount = body.plugins.wordcount.getCount();
    if(wordCount < 20 ){
        msg += "Body of the article is too short, type at least 20 word.\n\n"
    }

    if(category < 1) {
        msg += "Please, enter the category.";
    }

    if(msg !== ""){
        alert(msg);
        event.preventDefault();
    }
});

function confirmRestory(event){
    let restore = confirm("Are you sure to restore this article?\n\nAll changes will be erase.");

    if(!restore){
        event.preventDefault();
    }
}