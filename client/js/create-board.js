function createBoard() {
  const name = document.querySelector('#board-name').value;
  const bg_color = document.querySelector('#board-color').value;
  const introduction = document.querySelector('#board-introduction').value;

  fetch(`/board`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      bg_color,
      introduction,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
    });

  location.reload();
}
