import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [user, setUser] = useState<LoginFormData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 로드
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // 사용자 정보가 없으면 회원가입 페이지로 리디렉션
      router.push("/signup");
    }
  }, [router]);

  // 로그인 처리
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("로그인 시도", user);
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user?.email || ""}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
