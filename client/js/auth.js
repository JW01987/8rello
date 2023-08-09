document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.wrapper');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');

  registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
  });

  loginLink.addEventListener('click', () => {
    wrapper.classList.remove('owner');
    wrapper.classList.remove('active');
  });

  // 회원 가입 폼
  const registerForm = document.querySelector('.register-form');
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = registerForm.querySelector('input[type=email]').value;
    const password = registerForm.querySelector('input[type=password]').value;
    const nickname = registerForm.querySelector('#nickname input').value;
    const bodyData = { email, password, username: nickname };

    try {
      //  회원가입 요청 보내기
      const response = await fetch(`/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/';
        alert(data.message);
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('회원가입 도중 오류가 발생했습니다.', error);
    }
  });

  // 로그인 폼
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = loginForm.querySelector('input[type=email]').value;
    const password = loginForm.querySelector('input[type=password]').value;

    try {
      const response = await fetch(`/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      // 로그인 성공시
      if (response.ok) {
        window.location.href = '/boards/1';
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      alert('로그인 도중 오류가 발생했습니다.');
      console.error(error);
    }
  });
});
