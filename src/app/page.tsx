'use client';

import React from 'react';
import { Modal } from 'antd';
import { useState } from 'react';
import { Checkbox } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  weight: ['700'],
  subsets: ['latin'],
});

export default function Home() {
  const router = useRouter();
  const [isProfessor, setIsProfessor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('학번을 입력해주세요'),

    password: Yup.string().required('비밀번호를 입력해주세요'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const error = () => {
    Modal.error({
      title: <span className={notoSansKr.className}>로그인 실패</span>,
      content: (
        <span className={notoSansKr.className}>
          학번 또는 비밀번호가 올바르지 않습니다.
        </span>
      ),
    });
  };
  const onSubmit = (data: { username: string; password: string }) => {
    const { username, password } = data;
    if (username === 'root' && password === 'root') {
      if (isProfessor) {
        router.push('/professor/dashboard');
      } else if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/student');
      }
    } else {
      error();
    }
  };

  return (
    <>
      <div className="w-screen h-[100dvh] flex">
        {/* left */}
        <section className="items-center justify-center flex-1 hidden lg:flex bg-primary">
          <div className="relative w-1/3 h-2/5">
            <Image
              src="/commons/logo.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>

        {/* right */}
        <section className="flex items-center justify-center flex-1 ">
          <div className="w-[70%] h-[70%] lg:w-1/2 lg:h-1/2  space-y-4 rounded-sm border-solid border-[1px] border-slate-200 shadow-xl flex flex-col justify-center items-center">
            <div className="mb-4 font-bold ">
              <span className="text-2xl text-primary sm:text-3xl md:text-4xl lg:text-2xl">
                Chosun{' '}
              </span>
              <span className="text-2xl text-secondary sm:text-3xl md:text-4xl lg:text-2xl">
                Online Judge
              </span>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center w-full space-y-4"
            >
              <input
                {...register('username')}
                className="w-3/4 h-8 md:h-16 lg:h-10  rounded-md   border border-gray-300 pl-4  placeholder:text-sm md:placeholder:text-lg lg:placeholder:text-sm text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
                type="text"
                placeholder="학번을 입력해주세요"
              />
              {errors.username && (
                <p className="w-3/4 pl-2 mt-1 text-sm text-left text-red-500 lg:text-xs">
                  {errors.username.message}
                </p>
              )}

              <input
                {...register('password')}
                className="w-3/4 h-8 md:h-16 lg:h-10   rounded-md border border-gray-300 pl-4 placeholder:text-sm md:placeholder:text-lg lg:placeholder:text-sm text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
              {errors.password && (
                <p className="w-3/4 pl-2 mt-1 text-sm text-left text-red-500 lg:text-xs">
                  {errors.password.message}
                </p>
              )}
              <div className="flex items-center  w-3/4 space-x-2">
                {/* 교수 로그인 체크박스 */}
                <div className=" flex  text-[#5a5a5a] items-center">
                  <Checkbox
                    checked={isProfessor}
                    onChange={(e) => setIsProfessor(e.target.checked)}
                  />
                  <span className="ml-2  md:text-lg lg:text-sm">
                    교수 로그인
                  </span>
                </div>

                {/* 관리자 로그인 체크박스 */}
                <div className="  flex  text-[#5a5a5a] items-center">
                  <Checkbox
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <span className="ml-2  md:text-lg lg:text-sm">
                    관리자 로그인
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-3/4 py-2 text-white transition rounded-md cursor-pointer md:py-5 lg:py-2 bg-primary hover:bg-primaryButtonHover"
              >
                로그인
              </button>
            </form>
            <Link
              href="/signup"
              className="w-3/4 py-2  md:py-5 lg:py-2  rounded-md bg-secondaryButton border-[1px] border-secondaryButtonBorder text-secondary flex items-center justify-center cursor-pointer hover:bg-secondaryButtonHover transition"
            >
              회원가입
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
