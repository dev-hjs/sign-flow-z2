import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 결제 정보 검증 스키마
const paymentSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  email: z.string().email("유효한 이메일을 입력해주세요"),
  amount: z.number().min(1, "결제 금액을 입력해주세요"),
  paymentMethod: z.enum(["신용카드", "무통장입금"]),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit: SubmitHandler<PaymentFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">이름</label>
          <input {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="amount">결제금액</label>
          <input type="number" {...register("amount")} />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>
        <div>
          <label htmlFor="paymentMethod">결제방식</label>
          <select {...register("paymentMethod")}>
            <option value="credit_card">신용카드</option>
            <option value="paypal">PayPal</option>
          </select>
          {errors.paymentMethod && <p>{errors.paymentMethod.message}</p>}
        </div>
        <button type="submit">결제하기</button>
      </form>
    </div>
  );
}
