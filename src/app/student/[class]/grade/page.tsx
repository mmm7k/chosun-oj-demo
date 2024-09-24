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
ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

export default function Grade() {
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
      'math',
      'implementation',
      'greedy',
      'string',
      'data_structures',
      'graphs',
      'dp',
    ],
    datasets: [
      {
        data: [13, 15, 18, 4, 7, 8, 17],
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
    <div className="w-full flex flex-col items-center py-14 gap-12 justify-center">
      <div className="bg-white shadow-md rounded-2xl w-[70%] pt-5 sm:pt-10 flex flex-col sm:flex-row items-center justify-between px-[1%] lg:px-[5%]">
        {/* 스탯과 랭크 카드 */}
        <div className=" flex flex-col sm:flex-row items-center text-secondary mt-5 sm:mt-0 sm:mb-10">
          <BiSolidAward className="text-[10rem] lg:text-[13rem] text-[#FFD700] animate-pulse mb-5 sm:mb-0" />
          <div className="ml-0 sm:ml-4 flex flex-col justify-center items-start text-blue-800 space-y-3 mb-5 sm:mb-0">
            <span className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
              <span>Rank:</span> <span className="text-blue-800 ">Gold 5</span>
            </span>
            <span className="text-lg lg:text-xl">
              🌱 Total Grass:{' '}
              <span className="font-semibold">{totalGrass}</span>
            </span>
            <span className="text-lg lg:text-xl">
              ⭐ Most Solved Level:{' '}
              <span className="font-semibold">{highestLevel}</span>
            </span>
            <span className="text-lg lg:text-xl">
              🏷️ Most Solved Tag:{' '}
              <span className="font-semibold">{mostSolvedTag}</span>
            </span>
          </div>
        </div>

        {/* 잔디심기 */}
        <div className="w-[80%] sm:w-[33%] lg:w-[30%]  mr-[5%] 2xl:mr-[10%]">
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
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl w-[70%] py-10 flex-col">
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
      </div>
      <div className="bg-white shadow-md rounded-2xl w-[70%] py-10 flex-col">
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
      </div>
    </div>
  );
}
