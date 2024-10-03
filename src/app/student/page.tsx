'use client';

import { Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { FaCodeBranch } from 'react-icons/fa';
import { PiRanking } from 'react-icons/pi';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '@/app/styles/heatmap.css';
import { BiSolidAward } from 'react-icons/bi';
import { useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { FaUserGraduate } from 'react-icons/fa6';

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

export default function StudentMain() {
  // 캐러셀 세팅
  const settings = {
    dots: true,
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

  // 오늘 날짜 가져오기
  const today = new Date();

  // 90일 전 날짜를 시작점으로 설정
  const startDate = new Date();
  startDate.setDate(today.getDate() - 90);

  // heatmapData를 90일 전부터 오늘까지 생성
  const heatmapData = Array.from({ length: 90 }, (_, i) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i); // startDate에서 i일 추가
    return {
      date: currentDate.toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환
      count: Math.floor(Math.random() * 5), // 0에서 4 사이의 랜덤 값 생성
    };
  });

  // 랭크
  const rank = useMemo(() => {
    const totalGrass = heatmapData.filter((item) => item.count > 0).length;

    if (totalGrass >= 150) {
      return 'Challenger';
    } else if (totalGrass >= 125) {
      return 'Grandmaster';
    } else if (totalGrass >= 100) {
      const level = Math.ceil((125 - totalGrass) / 5);
      return `Diamond ${level}`;
    } else if (totalGrass >= 75) {
      const level = Math.ceil((100 - totalGrass) / 5);
      return `Platinum ${level}`;
    } else if (totalGrass >= 50) {
      const level = Math.ceil((75 - totalGrass) / 5);
      return `Gold ${level}`;
    } else if (totalGrass >= 25) {
      const level = Math.ceil((50 - totalGrass) / 5);
      return `Silver ${level}`;
    } else {
      const level = Math.ceil((25 - totalGrass) / 5);
      return `Bronze ${level}`;
    }
  }, [heatmapData]);

  const rankColor = useMemo(() => {
    if (rank.startsWith('Challenger')) {
      return '#ff0000'; // 빨간색
    } else if (rank.startsWith('Grandmaster')) {
      return '#ff4500'; // 주황색
    } else if (rank.startsWith('Diamond')) {
      return '#00ffff'; // 청록색
    } else if (rank.startsWith('Platinum')) {
      return '#00d9ff'; // 플래티넘 은색
    } else if (rank.startsWith('Gold')) {
      return '#FFD700'; // 황금색
    } else if (rank.startsWith('Silver')) {
      return '#C0C0C0'; // 은색
    } else {
      return '#cd7f32'; // 청동색
    }
  }, [rank]);

  //도넛 차트 데이터
  const donutData = {
    labels: ['Lv.1', 'Lv.2', 'Lv.3'],
    datasets: [
      {
        label: '학생 수',
        data: [17, 5, 13],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // 도넛 차트 옵션
  const donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  // 전체 합계 계산
  const total = donutData.datasets[0].data.reduce(
    (acc, value) => acc + value,
    0,
  );

  // 퍼센트 계산 함수
  const calculatePercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1); // 소수점 1자리까지 계산
  };

  // 레이다 차트 데이터
  const radarData = {
    labels: [
      'implementation',
      'greedy',
      'string',
      'data_structures',
      'graphs',
      'dp',
    ],
    datasets: [
      {
        data: [15, 18, 4, 7, 8, 17],
        fill: true,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
      },
    ],
  };
  // 레이다 차트 옵션
  const radarOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 20,
        ticks: {
          display: false,
        },
      },
    },
  };

  // 전체 합계 계산
  const totalTag = radarData.datasets[0].data.reduce(
    (acc, value) => acc + value,
    0,
  );

  // 상위 3개의 태그와 데이터 가져오기
  const topTags = useMemo(() => {
    const tagData = radarData.labels.map((label, index) => ({
      label,
      count: radarData.datasets[0].data[index],
    }));

    // 데이터 값을 기준으로 정렬하여 상위 3개 추출
    return tagData.sort((a, b) => b.count - a.count).slice(0, 3);
  }, [radarData]);

  // 퍼센트 계산 함수
  const calculateTagPercentage = (value: number) => {
    return ((value / totalTag) * 100).toFixed(1); // 소수점 1자리까지 계산
  };

  // 스텟
  const totalGrass = useMemo(() => {
    return heatmapData.filter((item) => item.count > 0).length;
  }, [heatmapData]);

  const highestLevel = useMemo(() => {
    const maxIndex = donutData.datasets[0].data.indexOf(
      Math.max(...donutData.datasets[0].data),
    );
    return donutData.labels[maxIndex];
  }, [donutData]);

  const mostSolvedTag = useMemo(() => {
    const maxIndex = radarData.datasets[0].data.indexOf(
      Math.max(...radarData.datasets[0].data),
    );
    return radarData.labels[maxIndex];
  }, [radarData]);

  return (
    <div className=" w-full flex flex-col items-center mb-36  gap-12 justify-center">
      {/* 배너 캐러셀 */}
      <section className="w-screen h-96 bg-black">
        <Slider {...settings} className="w-full h-full text-white">
          <div className="bg-black  w-screen px-[10%] lg:px-[20%] h-96 ">
            <div className="h-96 flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <span className="">예시 타이틀1</span>
                <span className="text-2xl">
                  조선대학교는 학생들의
                  <br />
                  성장을 응원합니다
                </span>
                <span className="text-gray-500">
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
          <div className="bg-black  w-screen  px-[10%] lg:px-[20%] h-96 ">
            <div className="h-96 flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <span className="">예시 타이틀2</span>
                <span className="text-2xl">
                  조선대학교는 학생들의
                  <br />
                  성장을 응원합니다
                </span>
                <span className="text-gray-500">
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
          <div className="bg-black  w-screen  px-[10%] lg:px-[20%] h-96 ">
            <div className="h-96 flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <span className="">예시 타이틀3</span>
                <span className="text-2xl">
                  조선대학교는 학생들의
                  <br />
                  성장을 응원합니다
                </span>
                <span className="text-gray-500">
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
      <section className="w-[90%] lg:w-[62%] flex flex-col sm:flex-row space-x-0 sm:space-x-12 space-y-12 sm:space-y-0">
        {/* 왼쪽 섹션 유저 프로필 */}
        <div className="w-[100%] sm:w-[25%] flex flex-col justify-center items-center py-10 px-10 border border-gray-300 rounded-xl space-y-1  text-gray-700">
          <FaUserGraduate className="text-primary text-[4rem] mb-2" />
          <span className="font-semibold text-xl">김민수</span>
          <span className=" text-lg">Developer</span>
          <div>
            <span className="font-semibold">Major : </span> 컴퓨터 공학과
          </div>
          <div>
            <span className="font-semibold">ID : </span> 20214931
          </div>
        </div>
        {/* 오른쪽 섹션 랭크,잔디 */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between  py-10 px-10 sm:px-1 md:px-10 lg:px-1 2xl:px-10 border border-gray-300 rounded-xl">
          {/* 랭크와 스텟 */}
          <div className="flex-1 flex flex-col items-center sm:flex-row  ">
            <BiSolidAward
              className={`text-[11rem] sm:text-[8rem]  lg:text-[9rem] xl:text-[10rem] 2xl:text-[11rem] animate-pulse mb-5 sm:mb-0`}
              style={{ color: rankColor }}
            />
            <div className="ml-0 sm:ml-0 lg:ml-3 flex flex-col justify-center items-start text-gray-600 space-y-3 mb-5 sm:mb-0">
              <span className=" lg:text-lg  2xl:text-xl font-semibold">
                <span>Rank:</span>
                <span className="text-gray-900 ">{rank}</span>
              </span>
              <div className="text-xs lg:text-base">
                <span> 🌱 Total Grass: </span>
                <span className="font-semibold text-gray-900">
                  {totalGrass}
                </span>
              </div>
              <div className="text-xs lg:text-base">
                <span> ⭐ Most Solved Level: </span>
                <span className="font-semibold text-gray-900">
                  {highestLevel}
                </span>
              </div>
              <div className="text-xs lg:text-base">
                <span>🏷️ Most Solved Tag: </span>
                <span className="font-semibold text-gray-900">
                  {mostSolvedTag}
                </span>
              </div>
            </div>
          </div>

          {/* 잔디심기 */}
          <div className="w-[50%] sm:w-[33%] lg:w-[35%] mr-1 relative">
            <CalendarHeatmap
              startDate={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 90,
                )
              }
              endDate={today}
              values={heatmapData}
              classForValue={(value: any) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-scale-${Math.min(value.count, 4)}`;
              }}
              showWeekdayLabels
              gutterSize={1.5}
            />
            <div className="absolute space-x-2 font-light text-gray-500  bottom-0 right-0 flex items-center ">
              <span className="text-xs 2xl:text-sm">Less</span>
              <div className="rounded-[0.27rem] bg-[#ebedf0] w-[0.9rem] h-[0.9rem]" />
              <div className="rounded-[0.27rem] bg-[#9be9a8] w-[0.9rem] h-[0.9rem]" />
              <div className="rounded-[0.27rem] bg-[#40c463] w-[0.9rem] h-[0.9rem]" />
              <div className="rounded-[0.27rem] bg-[#30a14e] w-[0.9rem] h-[0.9rem]" />
              <div className="rounded-[0.27rem] bg-[#216e39] w-[0.9rem] h-[0.9rem]" />
              <span className="text-xs 2xl:text-sm ">More</span>
            </div>
          </div>
        </div>
      </section>
      <section className="border border-gray-300 rounded-xl w-[90%] lg:w-[62%] py-10 flex-col">
        <p className="text-lg font-semibold text-secondary pl-9 mb-7 flex items-center">
          <PiRanking className="text-2xl mr-1 mt-[0.18rem] " />

          <span>난이도 분포</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center w-[90%]  mx-auto">
          {/* 도넛 차트 */}
          <div className="w-[80%] mb-14 sm:mb-0 sm:w-[40%] lg:w-[25%] h-48">
            <Doughnut data={donutData} options={donutOptions} />
          </div>

          {/* 오른쪽 레이블 표시 */}
          <div className="w-[80%] sm:w-[50%] lg:w-[60%] flex flex-col">
            <div className="flex justify-between font-semibold pl-[20%] pr-[25%]">
              <span>레벨</span>
              <span>문제</span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />

            {/* Lv.1 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-[#FF6384] font-semibold">Lv.1</span>
              <span>{donutData.datasets[0].data[0]}</span>
              <span className="absolute right-0 text-gray-400">
                {calculatePercentage(donutData.datasets[0].data[0])}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />

            {/* Lv.2 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-[#36A2EB] font-semibold">Lv.2</span>
              <span>{donutData.datasets[0].data[1]}</span>
              <span className="absolute right-0 text-gray-400">
                {calculatePercentage(donutData.datasets[0].data[1])}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />

            {/* Lv.3 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-[#FFCE56] font-semibold">Lv.3</span>
              <span>{donutData.datasets[0].data[2]}</span>
              <span className="absolute right-0 text-gray-400">
                {calculatePercentage(donutData.datasets[0].data[2])}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />
          </div>
        </div>
      </section>
      <section className="border border-gray-300 rounded-xl w-[90%] lg:w-[62%] py-10 flex-col">
        <p className="text-lg font-semibold text-secondary pl-9 mb-7 flex items-center">
          <FaCodeBranch className="text-xl mr-1 mt-[0.18rem]" />
          <span>알고리즘 분포</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center w-[90%]  mx-auto">
          {/* Radar 차트 */}
          <div className="w-[80%] mb-14 sm:mb-0 sm:w-[40%] lg:w-[28%] h-64">
            <Radar data={radarData} options={radarOptions} />
          </div>

          {/* 오른쪽 레이블 표시 */}
          <div className="w-[80%] sm:w-[50%] lg:w-[60%] flex flex-col">
            <div className="flex justify-between font-semibold pl-[20%] pr-[25%]">
              <span>태그</span>
              <span>문제</span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />

            {/* 가장 많이 푼 #1 태그 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-secondary">#{topTags[0].label}</span>
              <span>{topTags[0].count}</span>
              <span className="absolute right-0 text-gray-400">
                {calculateTagPercentage(topTags[0].count)}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />

            {/* 가장 많이 푼 #2 태그 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-secondary">#{topTags[1].label}</span>
              <span>{topTags[1].count}</span>
              <span className="absolute right-0 text-gray-400">
                {calculateTagPercentage(topTags[1].count)}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />
            {/* 가장 많이 푼 #3 태그 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-secondary">#{topTags[2].label}</span>
              <span>{topTags[2].count}</span>
              <span className="absolute right-0 text-gray-400">
                {calculateTagPercentage(topTags[2].count)}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
