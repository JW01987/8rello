const colList = document.querySelector('.column-list');
const colName = document.querySelector('#colName');
const btnAddCol = document.querySelector('#btnAddCol');

window.onload = () => {
  getAllCol();
  btnAddCol.addEventListener('click', () => {
    addCol();
  });
};

console.log(12, id);
//컬럼 불러오기
const getAllCol = async () => {
  //보드 아이디 필요
  const api = await fetch(`/column/${id}`, {
    method: 'GET',
  });
  const data = await api.json();
  makeCol(data);
};

//칼럼 생성
const makeCol = async (data) => {
  colList.innerHTML += '';
  for await (let col of data) {
    const cardData = await (await fetch(`/cards?column_id=${col.id}`)).json();
    let cardTemp = '';
    for (let card of cardData.results) {
      cardTemp += `<div class="d-flex" data-card-id="${card.id}" data-position="${card.position}"><button
      type="button"
      class="btn-sm card-item mb-2 "
      data-bs-toggle="modal"
      data-bs-target="#cardDetail"
      draggable='true'
      data-card-id="${card.id}"
      >
    <span class='card-title'>${card.card_name}</span> 
    </button>
    <div class="ms-2">
    <button class="card-up-btn">🔼</button>
    <button class="card-down-btn">🔽</button>
    </div>
    </div>
    `;
    }
    const tempHtml =

      `<li class="column-item" draggable='true' data-col-id="${col.id}">
    <!-- 아래 버튼 누르면 active , 좌우로 이동하게 합시다 -->
    <button class="btn-column-check">✔️</button>
    <h3 class="mb-2">${col.name}</h3>
    <div class="btn-right mb-3 justify-content-between">
    <button type="button"
    class="btn btn-danger btn-sm delColBtn" data-col-id="${col.id}">
        컬럼 삭제
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-sm create-card-btn"
        data-bs-toggle="modal"
        data-bs-target="#createCard"
        data-col-id="${col.id}"
      >
        카드 +
      </button>
    </div>
    <div class="card-list">
  ` +
      cardTemp +
      `
    </div>
    </li>`;

    colList.innerHTML += tempHtml;
  }
  //칼럼 삭제 이벤트
  const delColBtnList = document.querySelectorAll('.delColBtn');
  delColBtnList.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      delCol(e);
    });
  });

  //카드 컬럼 내에서 이동
  const cardUpBtnList = document.querySelectorAll('.card-up-btn');
  const cardDownBtnList = document.querySelectorAll('.card-down-btn');

  cardUpBtnList.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      cardMoveInCol(e, true);
    });
  });

  cardDownBtnList.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      cardMoveInCol(e, false);
    });
  });
};

//컬럼 추가
const addCol = async () => {
  //보드 아이디 필요
  const response = await fetch('/column', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: colName.value,
      boardId: id,
    }),
  });
  const { status } = response;
  const { message } = await response.json();

  if (status) {
    alert(message);
    return window.location.reload();
  }
};

//칼럼 삭제
const delCol = async (e) => {
  const colId = e.target.dataset.colId;
  const response = await fetch(`/column/${colId}`, {
    method: 'DELETE',
  });
  const { status } = response;
  const { message } = await response.json();

  if (status) {
    alert(message);
    return window.location.reload();
  }
};

//컬럼 이동하기
let picked = null;
let pickedIndex = null;
colList.addEventListener('dragstart', (e) => {
  const target = e.target;
  if (target.parentNode !== e.currentTarget) return;
  picked = target;
  pickedIndex = [...target.parentNode.children].indexOf(target);
});
colList.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (e.target.parentNode !== e.currentTarget) return;
});
colList.addEventListener('drop', async (e) => {
  if (e.target.parentNode !== e.currentTarget) return;
  const target = e.target;
  const index = [...target.parentNode.children].indexOf(target);
  index > pickedIndex ? target.after(picked) : target.before(picked);

  const colId = picked.getAttribute('data-col-id');
  const prev = picked.previousSibling?.getAttribute('data-col-id') || 0;
  const next = picked.nextSibling?.getAttribute('data-col-id') || 0;
  const response = await fetch('/column/index', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prev,
      next,
      id: colId,
    }),
  });
  const { status } = response;
  const { message } = await response.json();

  if (status) {
    alert(message);
    return window.location.reload();
  }
});

const cardMoveInCol = async (e, isPrev) => {
  const target = e.target.parentNode.parentNode;
  if (isPrev) {
    const prevCard = target.previousElementSibling;
    target.after(prevCard);
  } else {
    const nextCard = target.nextElementSibling;
    target.before(nextCard);
  }

  const cardId = target.getAttribute('data-card-id');
  const prevPosition =
    target.previousElementSibling.getAttribute('data-position');
  const nextPosition = target.nextElementSibling.getAttribute('data-position');
  const colId = target.parentNode.parentNode.getAttribute('data-col-id');

  console.log(prevPosition, nextPosition);

  const response = await fetch(`/cards/position?card_id=${cardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      column_id: colId,
      prevPosition,
      nextPosition,
    }),
  })
    .then((res) => res.json())
    .then(alert('카드 위치가 수정되었습니다'))
    .then(window.location.reload());
};
