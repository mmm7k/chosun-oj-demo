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
import { FaUserCircle } from 'react-icons/fa';
ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

export default function Grade() {
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
        // label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
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
        suggestedMax: 100,
        ticks: {
          display: false,
        },
      },
    },
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
  return (
    <div className="w-full flex flex-col items-center py-14 gap-12 justify-center">
      <div className="bg-white shadow-md rounded-2xl w-[70%] pt-10 flex items-center justify-between px-[4%]">
        <div className="w-[50%] flex-col text-secondary">
          <FaUserCircle className="text-4xl" />
          <span className="text-2xl">김민수</span>
        </div>
        {/* 잔디심기 */}
        <div className="w-[30%]">
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

            {/* 구현 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-secondary">#math</span>
              <span>{radarData.datasets[0].data[0]}</span>
              <span className="absolute right-0 text-gray-400">
                {calculatePercentage(radarData.datasets[0].data[0])}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />

            {/* Lv.2 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-[#36A2EB] font-semibold">Lv.2</span>
              <span>{donutData.datasets[0].data[1]}</span>
              <span className="absolute right-0 text-gray-400">
                {calculatePercentage(radarData.datasets[0].data[1])}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />

            {/* Lv.3 */}
            <div className="flex justify-between pl-[5%] pr-[25%] relative">
              <span className="text-[#FFCE56] font-semibold">Lv.3</span>
              <span>{donutData.datasets[0].data[2]}</span>
              <span className="absolute right-0 text-gray-400">
                {calculatePercentage(radarData.datasets[0].data[2])}%
              </span>
            </div>
            <hr className="w-full border-b-1 border-gray-300 my-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
