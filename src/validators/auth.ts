import { z } from "zod";

// 스키마 정의
export const signupSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일을 입력해주세요."),
  contact: z.string().length(11, "연락처는 11자리여야 합니다."),
  role: z.string().nonempty("역할을 선택해주세요."),
  password: z.string().min(6, "비밀번호는 6자리 이상이어야 합니다."),
  passwordConfirm: z.string().min(6, "비밀번호는 6자리 이상이어야 합니다."),
});

// 폼 데이터 타입
export type SignUpFormData = z.infer<typeof signupSchema>;
