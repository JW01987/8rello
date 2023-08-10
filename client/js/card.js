// 카드 생성 (모달창 열리며 column에 담긴 column_id를 심어줌)
document
  .getElementById('createCard')
  .addEventListener('shown.bs.modal', (event) => {
    const modalTriggerButton = event.relatedTarget;
    const column_id = modalTriggerButton.getAttribute('data-col-id');
    console.log(column_id);

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
