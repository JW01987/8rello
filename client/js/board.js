console.log('board.js 연결');
const API_URL = 'http://localhost:3000';
const boardListElement = document.getElementById('boardList');
//-- 지금 접속하고 있는 board_id값 추출 --//]
const boardId = currentPath.match(/\d+/)[0]; // 경로에서 숫자 값 추출

//-- 보드 불러오기 --//
async function getBoards() {
  try {
    const response = await fetch(`${API_URL}/board`, {
      method: 'GET',
      headers: {},
    });

    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
}

async function populateBoardList() {
  try {
    const boards = await getBoards();
    let boardListHTML = '';

    boardListHTML += `
      <h2 style="color: #fff; padding: 10px 20px; margin-bottom: 10px; font-size: 20px">
        ${boards[0].user.username}님의 보드
      </h2>`; // 예시로 첫 번째 보드의 사용자명 사용
    boardListHTML += '<ul>'; // ul 요소 열기

    boards.forEach((board) => {
      const isActive = board.id === parseInt(boardId, 10);
      const activeClass = isActive ? 'active' : '';

      boardListHTML += `
        <li>
          <a href="/boards/${board.id}" data-board-id="${board.id}" class="${activeClass}">${board.name}</a>
        </li>
      `;
    });

    boardListHTML += '</ul>'; // ul 요소 닫기

    boardListElement.innerHTML = boardListHTML;
  } catch (error) {
    console.error('Error populating board list:', error);
  }
}

window.addEventListener('load', populateBoardList);
//-- /보드 불러오기 --//

//-- 보드 상세정보 --//
async function loadBoardDetail(boardId) {
  try {
    const response = await fetch(`${API_URL}/board/${boardId}`, {
      method: 'GET',
      headers: {},
    });

    if (!response.ok) {
      throw new Error('Failed to fetch board detail');
    }

    const boardDetail = await response.json();
    return boardDetail;
  } catch (error) {
    console.error('Error fetching board detail:', error);
    throw error;
  }
}

function populateBoardDetail(boardId) {
  try {
    const boardNameElement = document.querySelector('h1');
    const containerFluidElement = document.querySelector('.container-fluid');

    loadBoardDetail(boardId)
      .then((boardDetail) => {
        boardNameElement.innerText = boardDetail.name;
        // 배경색 변경
        containerFluidElement.style.backgroundColor = `${boardDetail.bg_color}`;
      })
      .catch((error) => {
        console.error('Error populating board detail:', error);
      });
  } catch (error) {
    console.error('Error populating board detail:', error);
  }
}

// 클라이언트에서 보드 상세 정보를 가져오고 페이지에 표시하기 위해 호출
populateBoardDetail(boardId);
//-- /보드 상세정보 --//

//-- 보드 수정하기 --//
async function updateBoard() {
  const currentPath = window.location.pathname;
  const id = currentPath.match(/\d+/)[0];
  const boardId = id;

  const boardNameInput = document.getElementById('editBoardName');
  const boardIntroductionInput = document.getElementById(
    'editBoardIntroduction',
  );
  const boardColorInput = document.getElementById('editBoardColor');

  const updateData = {};

  if (boardNameInput.value.trim() !== '') {
    updateData.name = boardNameInput.value;
  }

  if (boardIntroductionInput.value.trim() !== '') {
    updateData.introduction = boardIntroductionInput.value;
  }

  if (boardColorInput.value.trim() !== '') {
    updateData.bg_color = boardColorInput.value;
  }

  if (Object.keys(updateData).length === 0) {
    console.log('No fields to update.');
    return;
  }

  const response = await fetch(`/board/${boardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  location.reload();
}
//-- /보드 수정하기 -//

//-- 보드 삭제하기 --//
const deleteButton = document.getElementById('btnDeleteBoard');

deleteButton.addEventListener('click', async () => {
  const confirmDelete = confirm('보드를 삭제하시겠습니까?');
  if (!confirmDelete) {
    return;
  }

  const response = await fetch(`/board/${boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    alert('삭제되었습니다.');
    location.reload();
  } else {
    const responseData = await response.json();
    console.error('Error deleting board:', responseData.error);
    alert('An error occurred while deleting the board.');
  }
});

//-- /보드 삭제하기 --//
