const inviteUserId = document.querySelector('#inviteUserId');
const userInviteBtn = document.querySelector('#userInviteBtn');
alert('등장');
userInviteBtn.addEventListener('click', async () => {
  console.log('시작');
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
  console.log('어디서 ㅜㅡ');
  const { message } = await response.json();

  alert(message);
  // return window.location.reload();
});
