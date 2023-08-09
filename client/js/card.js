function createCard() {
  const card_name = document.querySelector('#card-name').value;
  const description = document.querySelector('#card-description').value;
  const deadline = document.querySelector('#date').value;
  if (!card_name || !description || !deadline) {
    alert('모든 값을 입력해주세요');
    return;
  }
  const column_id = 3;
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
