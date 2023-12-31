//validate title, body and category of article
document.getElementsById('sendArticle').addEventListener('click', function(event){
    let title = document.getElementById('articleTitle').value.trim();
    let body = document.getElementById('articleBody').value.trim();
    let category = document.getElementsByName('articleCategory')[0].value;
    let msg = "";
    
    if (title.length < 7 ){
        msg += "Title must be higher, with a minimum of 8 characters.\n\n";
    }
    if(body.length < 49 ){
        msg += "Body of the article is too short, type at least 50 characters.\n\n"
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
        event.event.preventDefault();
    }
}
