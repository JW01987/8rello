function createCard() {
  const card_name = document.querySelector('#card-name').value;
  const description = document.querySelector('#card-description').value;
  const deadline = document.querySelector('#date').value;
  console.log(
    'cardName',
    card_name,
    'description',
    description,
    'deadline',
    deadline,
  );
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
    });
  // .then(window.location.href('/'));
}
