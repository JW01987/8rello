// ㅁㅔㅁ버 추가
function addCardMember(cardId, userName) {
  console.log(userName);
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

document.querySelector('#btnAddMember').addEventListener('click', () => {
  const cardId = document
    .querySelector('#btnAddMember')
    .getAttribute('data-card-id');
  const userNameInput = document.querySelector('#addMemberInput');
  const userName = userNameInput.value;

  addCardMember(cardId, userName);
});

// // 버튼 클릭 시 멤버 리스트 가져오기
// function fetchMembersAndPopulateList(cardId) {
//   fetch(`/cards/member/${cardId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       const memberList = document.querySelector('.card-member-list');

//       // 멤버 리스트를 돌면서 화면에 추가
//       data.result.forEach((member) => {
//         const li = document.createElement('li');
//         li.textContent = member.username;
//         memberList.appendChild(li);
//       });
//     })
//     .catch((error) => {
//       console.error('Error fetching members:', error);
//     });
// }

// // 페이지 로드 시 멤버 리스트 가져와서 화면에 추가
// window.addEventListener('load', () => {
//   const cardId = 1;
//   fetchMembersAndPopulateList(cardId);
// });
