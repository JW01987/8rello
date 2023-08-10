const inviteUserId = document.querySelector('#inviteUserId');
const userInviteBtn = document.querySelector('#userInviteBtn');

//보드에 유저 초대
userInviteBtn.addEventListener('click', async () => {
  const response = await fetch(`/board/invitation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: inviteUserId.value,
      boardId: id,
    }),
  });
  const { message } = await response.json();

  alert(message);
  return window.location.reload();
});
