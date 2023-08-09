const profileEl = document.querySelector('#profile-update');
const nicknameEl = document.querySelector('#nickname-update');
const nicknameSaveBtnEl = document.querySelector('#nickname-save-btn');

// 로그인한 사용자 정보를 받아와서 세팅
profileEl.addEventListener('click', async () => {
  const response = await fetch('/users/profile');
  const data = await response.json();
  if (response.ok) {
    nicknameEl.value = data.username;
    nicknameEl.setAttribute('data-user-id', data.id);
  } else {
    console.error(data.message);
    alert(data.message);
  }
});

// 닉네임 저장
nicknameSaveBtnEl.addEventListener('click', async (e) => {
  const userId = nicknameEl.getAttribute('data-user-id');
  const username = nicknameEl.value;
  const bodyData = { username };
  const response = await fetch(`/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });
  const data = await response.json();
  if (response.ok) {
    window.location.reload();
  } else {
    console.error(data.message);
    alert(data.message);
  }
});
