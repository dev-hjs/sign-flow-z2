import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignUpFormData } from "@/validators/auth";
import Modal from "./Modal";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData | null>(null);

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border bg-gray-100 space-y-4 w-full max-w-md p-6"
      >
        {/* Input fields for the form */}
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            계정을 생성합니다
          </h3>
          <p className="text-sm text-muted-foreground">
            필수 정보를 입력해볼게요.
          </p>
        </div>

        {/* Name field */}
        <label className="block">
          <span className="text-gray-700">이름</span>
          <input
            {...register("name")}
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="홍길동"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </label>

        {/* Email field */}
        <label className="block">
          <span className="text-gray-700">이메일</span>
          <input
            {...register("email")}
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="test@gmail.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>

        {/* Contact field */}
        <label className="block">
          <span className="text-gray-700">연락처</span>
          <input
            {...register("contact")}
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="01012345678"
          />
          {errors.contact && (
            <span className="text-red-500 text-sm">
              {errors.contact.message}
            </span>
          )}
        </label>

        {/* Role selection */}
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

        {/* Password field */}
        <label className="block">
          <span className="text-gray-700">비밀번호</span>
          <input
            {...register("password")}
            type="password"
            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </label>

        {/* Password confirmation field */}
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

        {/* Submit button */}
        <button
          type="submit"
          className="py-3 px-4 w-full border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          회원가입
        </button>
      </form>

      {/* Modal for displaying form data upon submission */}
      <Modal
        isOpen={isModalOpen}
        data={formData}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
