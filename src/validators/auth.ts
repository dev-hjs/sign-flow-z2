import { z } from "zod";

// 스키마 정의
export const signupSchema = z
  .object({
    name: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일을 입력해주세요."),
    contact: z.string().length(11, "연락처는 11자리여야 합니다."),
    role: z.string().nonempty("역할을 선택해주세요."),
    password: z
      .string()
      .min(6, "비밀번호는 6자리 이상이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
      ),
    passwordConfirm: z.string().min(6, "비밀번호는 6자리 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

// 폼 데이터 타입
export type SignUpFormData = z.infer<typeof signupSchema>;
