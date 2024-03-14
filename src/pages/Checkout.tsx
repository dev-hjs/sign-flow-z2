import { useEffect, useRef, useState } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const clientKey = "test_ck_DpexMgkW36P6nxMd6KOErGbR5ozO";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

export default function Checkout() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const [price, setPrice] = useState(50_000);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  return (
    <Card className="p-5">
      <h1 className="text-md text-center font-medium leading-none mb-5">
        주문서
      </h1>
      <div id="payment-widget" />
      <div className="items-top flex space-x-2 mb-4">
        <input
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 5_000 : price + 5_000);
          }}
          placeholder="0"
        />
        <label>5,000원 할인 쿠폰 적용</label>
      </div>

      <Button
        className="w-full bg-blue-500"
        onClick={async () => {
          // 비동기 함수로 변경
          const paymentWidget = paymentWidgetRef.current;
          if (!paymentWidget) return; // paymentWidget이 없는 경우 조기 반환

          try {
            await paymentWidget.requestPayment({
              orderId: nanoid(),
              orderName: "토스 티셔츠 외 2건",
              customerName: "김토스",
              customerEmail: "customer123@gmail.com",
              successUrl: `${window.location.origin}/success`,
              failUrl: `${window.location.origin}/fail`,
            });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        결제하기
      </Button>
    </Card>
  );
}
