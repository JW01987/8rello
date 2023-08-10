// 카드 생성 (모달창 열리며 column에 담긴 column_id를 심어줌)
document
  .getElementById('createCard')
  .addEventListener('shown.bs.modal', (event) => {
    const modalTriggerButton = event.relatedTarget;
    const column_id = modalTriggerButton.getAttribute('data-col-id');

    function createCard(column_id) {
      const card_name = document.querySelector('#card-name').value;
      const description = document.querySelector('#card-description').value;
      const deadline = document.querySelector('#date').value;
      if (!card_name || !description || !deadline) {
        alert('모든 값을 입력해주세요');
        return;
      }
      fetch(`/cards/create?column_id=${column_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card_name,
          description,
          deadline,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
        })
        .then(window.location.reload());
    }

    document
      .querySelector('.create-card-btn')
      .addEventListener('click', (event) => {
        createCard(column_id);
      });
  });

// 카드 상세 모달
document
  .getElementById('cardDetail')
  .addEventListener('shown.bs.modal', async (event) => {
    const modalTriggerButton = event.relatedTarget;
    const card_id = modalTriggerButton.getAttribute('data-card-id');
    console.log(card_id);

    const data = await fetch(`/cards/detail?card_id=${card_id}`);
    const cardData = await data.json();
    console.log(data);
    const cardDetail = cardData.result;
    console.log(cardDetail);
    const cardName = document.querySelector('.card-name');
    cardName.textContent = cardDetail.card_name;
    const cardDescription = document.querySelector('.card-description');
    cardDescription.textContent = cardDetail.description;
    const cardDeadline = document.querySelector('.card-deadline');
    cardDeadline.textContent = cardDetail.deadline;

    const commentData = await (
      await fetch(`/cards/comments?card_id=${card_id}`)
    ).json();
    const commentList = document.querySelector('.comment-list');
    console.log('댓글', commentData);
    let comment_temp = ``;
    for await (let data of commentData) {
      let comment = data.comment;
      let username = data.user.username;
      comment_temp += `<li class="comment-item">
      <strong class="user-id mb-3">${username} :</strong>
      <div class="comment-content">
        <div>
          <span class="user-comment"
            >${comment}</span
          >
        </div>
        <div class="btn-right">
          <button
            type="button"
            class="btn btn-outline-primary btn-comment-edit"
            style="
              --bs-btn-padding-y: 0.25rem;
              --bs-btn-padding-x: 0.5rem;
              --bs-btn-font-size: 0.75rem;
            " data-comment-id=${data.id}
          >
            수정
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary comment-delete-btn"
            style="
              --bs-btn-padding-y: 0.25rem;
              --bs-btn-padding-x: 0.5rem;
              --bs-btn-font-size: 0.75rem;
            " data-comment-id=${data.id}
          >
            삭제
          </button>
        </div>
      </div>
      <div class="comment-edit-content">
        <div class="input-box">
          <input
            type="text"
            class="form-control"
            placeholder="수정할 댓글내용을 입력해주세요."
          />
          <button type="button" class="btn btn-dark">
            등록하기
          </button>
        </div>
      </div>
    </li>`;
      commentList.innerHTML = comment_temp;
    }

    document
      .querySelector('.write-comment-btn')
      .addEventListener('click', async (event) => {
        const comment = document.getElementById('comment-input').value;
        console.log('코멘트코멘트', comment);
        const response = await fetch(`/cards/comments?card_id=${card_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment: comment,
          }),
        });
        const data = await response.json();
        alert(data.message);

        // 모달창만 새로고침 가능?
      });

    // 멤버 api 완성 후 구현
    // let member_temp = ``
    const deleteBtn = document.querySelectorAll('.comment-delete-btn');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const comment_id = event.target.getAttribute('data-comment-id');
        deleteComment(comment_id);
      });
    });
  });

async function deleteComment(comment_id) {
  const data = await (
    await fetch(`/cards/comments?comment_id=${comment_id}`, {
      method: 'DELETE',
    })
  ).json();
  alert(data.message);
}
