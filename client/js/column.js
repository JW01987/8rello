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
      cardTemp += `<button
      type="button"
      class="btn-sm card-item mb-2"
      data-bs-toggle="modal"
      data-bs-target="#cardDetail"
    ><span class='card-title'>${card.card_name}</span> </button>`;
    }
    const tempHtml =
      `<li class="column-item" data-col-id="${col.id}">
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
      <button
        type="button"
        class="btn-sm card-item mb-2"
        data-bs-toggle="modal"
        data-bs-target="#cardDetail"
      >
        <span class="card-title"
          >간략한.. 카드 제목나올곳 누르면 숑나올곳 누르면 숑나올곳
          누르면 숑나올곳 누르면 숑나올곳 누르면 숑</span
        >
      </button>
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
  picked = target;
  pickedIndex = [...target.parentNode.children].indexOf(target);
});
colList.addEventListener('dragover', (e) => {
  e.preventDefault();
});
colList.addEventListener('drop', async (e) => {
  const target = e.target;
  const index = [...target.parentNode.children].indexOf(target);
  index > pickedIndex ? target.after(picked) : target.before(picked);

  const colId = picked.getAttribute('data-card-id');
  const prev = picked.previousSibling?.getAttribute('data-card-id') || 0;
  const next = picked.nextSibling?.getAttribute('data-card-id') || 0;

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
