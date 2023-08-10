// 🍉 로그아웃
const logoutBtnEl = document.querySelector('#logout');
logoutBtnEl.addEventListener('click', async () => {
  try {
    const response = await fetch('/auth/logout', {
      method: 'POST',
    });
    const result = await response.json();
    if (response.ok) {
      window.location.href = '/'; // 로그아웃 성공 시 로그인 페이지로 리디렉션
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('로그아웃 도중 오류가 발생했습니다.', error);
  }
});
