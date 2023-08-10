// 멤버 추가 함수
function addCardMember(cardId, userName) {
  fetch(`/cards/member/${cardId}?user_id=${userName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      location.reload();
    })
    .catch((error) => {
      console.error('에러', error);
    });
}

// 멤버 추가 버튼
document.querySelector('#btnAddMember').addEventListener('click', () => {
  const cardId = document
    .querySelector('#btnAddMember')
    .getAttribute('data-card-id');
  const userNameInput = document.querySelector('#addMemberInput');
  const userName = userNameInput.value;

  addCardMember(cardId, userName);
});
