console.log('board.js 연결');
const API_URL = 'http://localhost:3000';
const boardListElement = document.getElementById('boardList');

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
      <h2 style="color: #fff; padding: 10px; margin-bottom: 10px;">
        ${boards[0].user.username}님의 보드
      </h2>`; // 예시로 첫 번째 보드의 사용자명 사용
    boardListHTML += '<ul>'; // ul 요소 열기

    boards.forEach((board) => {
      boardListHTML += `
        <li>
          <a href="/boards/${board.id}" data-board-id="${board.id}">${board.name}</a>
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
