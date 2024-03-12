"use client";

import React from "react";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function PaymentForm() {
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
                <img
                  src="https://picsum.photos/100/100"
                  alt="상품 이미지"
                  className="mr-4"
                />
                <div className="flex flex-col">
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
              <Select className="mb-4">
                <SelectTrigger className="w-full bg-gray-100 border border-gray-300">
                  <SelectValue
                    placeholder="배송메모를 선택해주세요"
                    className="pl-2"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light" className="hover:bg-gray-100">
                    집 앞에 놓아주세요.
                  </SelectItem>
                  <SelectItem value="dark" className="hover:bg-gray-100">
                    부재중시 연락바랍니다.
                  </SelectItem>
                  <SelectItem value="system" className="hover:bg-gray-100">
                    무인 택배함에 놓아주세요.
                  </SelectItem>
                </SelectContent>
              </Select>
              <hr className="my-4" />
              <p className="mb-4">쿠폰/포인트</p>
              <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
                <Label
                  htmlFor="email"
                  style={{ width: 100 }}
                  className="block text-sm font-medium text-gray-700"
                >
                  쿠폰
                </Label>
                <Input
                  type="email"
                  placeholder=""
                  className="border p-2 w-full"
                />
                <Button
                  type="submit"
                  style={{ width: 150 }}
                  className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition-colors duration-200"
                >
                  쿠폰 적용
                </Button>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
                <Label
                  htmlFor="email"
                  style={{ width: 100 }}
                  className="block text-sm font-medium text-gray-700"
                >
                  포인트
                </Label>
                <Input
                  type="email"
                  placeholder=""
                  className="border p-2 w-full"
                />
                <Button
                  type="submit"
                  style={{ width: 150 }}
                  className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition-colors duration-200"
                >
                  포인트 사용
                </Button>
              </div>
              <div className="flex justify-between">
                <span>보유 포인트</span>
                <span>2,300</span>
              </div>
            </CardContent>
            {/* 우측 영역 */}
            <CardContent className="flex-grow p-4 border-t md:border-t-0 md:border-l">
              <CardTitle className="text-lg font-semibold mb-4">
                최종 결제금액
              </CardTitle>
              <div className="flex flex-col mb-4">
                <div className="flex justify-between px-4 py-2">
                  <span>상품 가격</span>
                  <span>18,000원</span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span>쿠폰 할인</span>
                  <span>0원</span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span>포인트 사용</span>
                  <span>2,300원</span>
                </div>
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
