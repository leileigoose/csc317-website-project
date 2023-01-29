function addNewComment(data) {
    let commentList = document.getElementById("commentList");
    let newComment = document.createElement('template');
    newComment.innerHTML = `
    <div id="message-${data.commentId}" class="singleComment">
        <p class="comment-user">${data.username} said...</p> 
        <p class="comment">${data.comment}</p>
        <p class="commentDate">${new Date().toLocaleString()}</p>
    </div>`;
    commentList.append(newComment.content);
    document.getElementById(`message-${data.commentId}`).scrollIntoView();
} 

document.getElementById('comment-button').addEventListener('click', function(ev){
    let commentTextElement = document.getElementById('comment-text');
    let commentText = commentTextElement.value;
    let postID = ev.currentTarget.dataset.postid;

    if (!commentText) {
        return;
    }     

    fetch('/comments/create',{
        method: "POST", 
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            comment: commentText, 
            postId: postID
        })
    })
    .then(response => response.json())
    .then(res_json => {
        addNewComment(res_json.data);
    })
    .catch(err => console.log(err))
})