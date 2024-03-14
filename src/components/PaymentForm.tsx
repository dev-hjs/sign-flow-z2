"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Checkout from "@/pages/Checkout";

// SelectListItem 타입 정의
interface SelectListItem {
  id: string;
  name: string;
}

// SelectFieldProps 타입 정의
interface SelectFieldProps {
  items: SelectListItem[];
  field: {
    onChange: (item: SelectListItem) => void;
    onBlur: () => void;
    value: SelectListItem | undefined;
    name: string;
  };
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

// 쿠폰 선택 컴포넌트
const SelectField: React.FC<SelectFieldProps> = ({
  items,
  field,
  placeholder,
  label,
  disabled,
}) => {
  const handleFieldValue = (value: string) => {
    const item = JSON.parse(value);
    field.onChange(item);
  };

  return (
    <Select onValueChange={handleFieldValue} disabled={disabled}>
      <SelectTrigger className="bg-gray-100 border border-gray-300">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {label && <SelectLabel>{label}</SelectLabel>}
        {items.map((item) => (
          <SelectItem
            key={item.id}
            value={JSON.stringify(item)}
            className="hover:bg-gray-100"
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// 결제 폼 컴포넌트
export default function PaymentForm() {
  const [points, setPoints] = useState(0); // 입력한 포인트
  const [pointsUsed, setPointsUsed] = useState(0); // 사용할 포인트
  const [selectedCoupon, setSelectedCoupon] = useState<
    SelectListItem | undefined
  >(undefined); // 선택된 쿠폰
  const [finalPrice, setFinalPrice] = useState(18000); // 최종 결제금액
  const [discount, setDiscount] = useState(0); // 할인액
  const [totalPoints, setTotalPoints] = useState(2300); // 총 보유 포인트
  const [showPaymentWidget, setShowPaymentWidget] = useState(false); // 토스페이 위젯

  // 쿠폰 목록
  const couponItems: SelectListItem[] = [
    { id: "5000", name: "5천원 할인쿠폰" },
    { id: "30percent", name: "30% 할인쿠폰" },
  ];

  // 포인트 입력 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setPoints(isNaN(newValue) ? 0 : newValue); // 음수 방지 및 숫자 검증
  };

  useEffect(() => {
    console.log(`선택된 쿠폰: ${selectedCoupon}`);
    console.log(`discount: ${discount}`);
    console.log(`finalPrice: ${finalPrice}`);
    console.log(`pointsUsed: ${pointsUsed}`);
  }, [selectedCoupon, discount, finalPrice, pointsUsed]);

  // 쿠폰 적용
  const handleApplyCoupon = () => {
    let discountAmount = 0;
    const basePrice = 18000;

    if (selectedCoupon) {
      // 선택된 쿠폰에 따라 할인액 계산
      console.log(`선택된 쿠폰: ${selectedCoupon.id}`);
      if (selectedCoupon.id === "5000") {
        discountAmount = 5000;
      } else if (selectedCoupon.id === "30percent") {
        discountAmount = basePrice * 0.3;
      } else {
        console.error(`쿠폰n: ${selectedCoupon}`);
      }

      setDiscount(discountAmount);
    }
  };

  // 포인트 적용
  const handleApplyPoints = () => {
    const pointsToUse = Math.max(0, Number(points));
    if (pointsToUse > totalPoints) {
      alert("보유 포인트보다 더 많은 포인트를 사용할 수 없습니다.");
      return;
    }

    setPointsUsed(pointsToUse);
  };

  // 쿠폰 변경
  const handleCouponChange = (item: SelectListItem) => {
    setSelectedCoupon(item);
  };

  // 쿠폰 할인, 포인트 사용 후 최종 결제금액
  useEffect(() => {
    const basePrice = 18000;
    let priceAfterDiscount = basePrice - discount - pointsUsed;
    let finalPriceAfterPoints = Math.max(0, priceAfterDiscount);
    if (finalPriceAfterPoints < 0) finalPriceAfterPoints = 0; // 최종 금액 음수 방지

    setFinalPrice(finalPriceAfterPoints);
  }, [discount, pointsUsed]);

  // 결제하기 버튼
  const handlePaymentClick = () => {
    setShowPaymentWidget(true);
  };

  // showPaymentWidget이 true일때 Checkout 컴포넌트 조건부 렌더링
  if (showPaymentWidget) {
    return <Checkout />;
  }

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="block w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <Card className="border-b">
          <CardHeader className="bg-gray-100 p-4">
            <Breadcrumb className="text-sm">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-blue-600">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="px-2 text-gray-400">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/payment"
                    className=" hover:text-blue-600"
                  >
                    결제하기
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          {/* 좌측 영역 */}
          <div className="flex flex-wrap md:flex-nowrap">
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-lg font-semibold mb-4">
                주문 상품 정보
              </CardTitle>
              <div className="flex items-center mb-4">
                <Image
                  src="https://picsum.photos/100/100"
                  width={100}
                  height={100}
                  alt="상품 이미지"
                />
                <div className="pl-3 flex flex-col">
                  <CardDescription className="font-medium">
                    거품처럼 부드러운 클렌징폼
                  </CardDescription>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="border border-gray-200 text-gray-800 mr-2"
                    >
                      필수
                    </Badge>
                    <span className="text-sm">용량 80ml 1개</span>
                    <p className="text-lg text-right font-semibold">18,000원</p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold mb-4">
                    주문자 정보
                  </CardTitle>
                  <p className="mb-1">홍길동</p>
                  <p className="mb-1">01012345678</p>
                  <p className="mb-4">test@gmail.com</p>
                </div>
                <Button
                  variant="outline"
                  className="self-start border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                >
                  수정
                </Button>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold mb-4">
                    배송 정보
                  </CardTitle>
                  <p className="mb-1">홍길동</p>
                  <p className="mb-1">01012345678</p>
                  <p className="mb-4">서울특별시 서대문구 성산로 7길</p>
                </div>
                <Button
                  variant="outline"
                  className="mb-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                >
                  변경
                </Button>
              </div>
              <p className="mb-4">배송 메모</p>
              <hr className="my-4" />
              <p className="mb-4">쿠폰/포인트</p>
              <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                  style={{ width: "100px" }}
                >
                  쿠폰
                </Label>
                <SelectField
                  items={couponItems}
                  field={{
                    onChange: handleCouponChange,
                    onBlur: () => {},
                    value: selectedCoupon,
                    name: "selectedCoupon",
                  }}
                  placeholder="쿠폰을 선택해주세요."
                  style={{ width: "300px" }}
                />
                <Button
                  onClick={handleApplyCoupon}
                  className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition-colors duration-200"
                  style={{ width: "140px" }} // 버튼 너비 조정
                >
                  쿠폰 적용
                </Button>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
                <Label
                  htmlFor="points"
                  style={{ width: "100px" }}
                  className="block text-sm font-medium text-gray-700"
                >
                  포인트
                </Label>
                <Input
                  id="points"
                  type="number"
                  value={points.toString()}
                  onChange={(e) =>
                    setPoints(Math.max(0, Number(e.target.value)))
                  }
                  placeholder="사용할 포인트"
                  style={{ width: "390px" }}
                />
                <Button
                  onClick={handleApplyPoints}
                  disabled={points > totalPoints || points < 0}
                  style={{ width: "85px" }}
                >
                  포인트 적용
                </Button>
              </div>
              <div className="flex justify-between">
                <span>보유 포인트</span>
                <span>2,300점</span>
              </div>
            </CardContent>
            {/* 우측 영역 */}
            <CardContent className="flex-grow p-4 border-t md:border-t-0 md:border-l">
              <CardTitle className="text-lg font-semibold mb-4">
                최종 결제금액
              </CardTitle>
              <div className="flex justify-between px-4 py-2">
                <span>총 상품 가격</span>
                <span>18,000원</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span>쿠폰 할인</span>
                <span>{discount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span>포인트 할인</span>
                <span>{pointsUsed.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between px-4 py-2 font-bold">
                <span>최종 결제금액</span>
                <span>{finalPrice.toLocaleString()}원</span>
              </div>
              <hr className="my-4" />
              <CardTitle className="text-lg font-semibold mb-4">
                결제 방법
              </CardTitle>
              <RadioGroup defaultValue="option-one" className="mb-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-one"
                    id="option-one"
                    className="form-radio"
                  />
                  <Label htmlFor="option-one" className="text-sm">
                    카드 결제
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-two"
                    id="option-two"
                    className="form-radio"
                  />
                  <Label htmlFor="option-two" className="text-sm">
                    휴대폰 결제
                  </Label>
                </div>
              </RadioGroup>
              <hr className="my-4" />
              <div className="items-top flex space-x-2 mb-4">
                <Checkbox id="terms1" className="form-checkbox" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    구매 조건 확인 및 결제 진행에 동의
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                onClick={handlePaymentClick}
              >
                결제하기
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
