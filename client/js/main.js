// 컬럼 선택
const columnItems = document.querySelectorAll('.column-item');

columnItems.forEach((columnItem) => {
  const checkButton = columnItem.querySelector('.btn-column-check');

  checkButton.addEventListener('click', (event) => {
    event.stopPropagation();

    columnItems.forEach((item) => {
      item.classList.remove('active');
    });

    columnItem.classList.add('active');
  });
});

// 댓글 수정 창
const commentItems = document.querySelectorAll('.comment-item');

commentItems.forEach((commentItem) => {
  const editButton = commentItem.querySelector('.btn-comment-edit');
  const commentContent = commentItem.querySelector('.comment-content');
  const commentEditContent = commentItem.querySelector('.comment-edit-content');

  editButton.addEventListener('click', () => {
    commentContent.style.display = 'none';
    commentEditContent.style.display = 'block';
  });
});
