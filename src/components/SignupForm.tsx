import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 스키마 정의
const signupSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일을 입력해주세요."),
  contact: z.string().length(11, "연락처는 11자리여야 합니다."),
  role: z.string().nonempty("역할을 선택해주세요."),
  password: z.string().min(6, "비밀번호는 6자리 이상이어야 합니다."),
  passwordConfirm: z.string().min(6, "비밀번호는 6자리 이상이어야 합니다."),
});

// 폼 데이터 타입
type SignUpFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    // 회원가입 로직 처리
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border bg-card bg-gray-100 space-y-4 w-full max-w-md mx-auto p-6"
      >
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            계정을 생성합니다
          </h3>
          <p className="text-sm text-muted-foreground">
            필수 정보를 입력해볼게요.
          </p>
        </div>
        <label className="block">
          <span className="text-gray-700">이름</span>
          <input
            {...register("name")}
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </label>
        <label className="block">
          <span className="text-gray-700">이메일</span>
          <input
            {...register("email")}
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>
        <label className="block">
          <span className="text-gray-700">연락처</span>
          <input
            {...register("contact")}
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.contact && (
            <span className="text-red-500 text-sm">
              {errors.contact.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="text-gray-700">역할</span>
          <select
            {...register("role")}
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            defaultValue=""
          >
            <option value="" disabled>
              역할을 선택해주세요
            </option>
            <option value="admin">관리자</option>
            <option value="user">일반사용자</option>
          </select>
          {errors.role && (
            <span className="text-red-500 text-sm">{errors.role.message}</span>
          )}
        </label>
        <label className="block">
          <span className="text-gray-700">비밀번호</span>
          <input
            {...register("password")}
            type="password"
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="text-gray-700">비밀번호 확인</span>
          <input
            {...register("passwordConfirm")}
            type="password"
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.passwordConfirm && (
            <span className="text-red-500 text-sm">
              {errors.passwordConfirm.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="mt-2 py-3 px-4 w-full border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
