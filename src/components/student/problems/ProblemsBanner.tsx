'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProblemsBanner() {
  // 배너 캐러셀 세팅
  const bannerSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    fade: true,
    waitForAnimate: false,
  };
  return (
    <section className="w-screen bg-black h-44">
      <Slider {...bannerSettings} className="w-full h-full text-white">
        <div className="bg-black  w-screen px-[10%] lg:px-[20%] h-44 ">
          <div className="flex items-center justify-between h-44">
            <div className="flex flex-col gap-3">
              <span className="text-xl">
                조선대학교는 학생들의
                <br />
                성장을 응원합니다
              </span>
              <span className="text-sm text-gray-500">
                1700개 기업의 채용 평가 데이터를
                <br />
                집중 분석한 문제풀이 플랫폼
              </span>
            </div>
            <div className="h-full w-[50%] relative">
              <Image
                src={'/banner/banner1.png'}
                layout="fill"
                objectFit="contain"
                alt="banner1"
              />
            </div>
          </div>
        </div>
        <div className="bg-black  w-screen  px-[10%] lg:px-[20%] h-44 ">
          <div className="flex items-center justify-between h-44">
            <div className="flex flex-col gap-3">
              <span className="text-xl">
                조선대학교는 학생들의
                <br />
                성장을 응원합니다
              </span>
              <span className="text-sm text-gray-500">
                1700개 기업의 채용 평가 데이터를
                <br />
                집중 분석한 문제풀이 플랫폼
              </span>
            </div>
            <div className="h-full w-[50%] relative">
              <Image
                src={'/banner/banner2.png'}
                layout="fill"
                objectFit="contain"
                alt="banner2"
              />
            </div>
          </div>
        </div>
        <div className="bg-black  w-screen  px-[10%] lg:px-[20%] h-44 ">
          <div className="flex items-center justify-between h-44">
            <div className="flex flex-col gap-3">
              <span className="text-xl">
                조선대학교는 학생들의
                <br />
                성장을 응원합니다
              </span>
              <span className="text-sm text-gray-500">
                1700개 기업의 채용 평가 데이터를
                <br />
                집중 분석한 문제풀이 플랫폼
              </span>
            </div>
            <div className="h-full w-[50%]  relative">
              <Image
                src={'/banner/banner3.png'}
                layout="fill"
                objectFit="contain"
                alt="banner3"
              />
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
}
