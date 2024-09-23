'use client';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend,
);

export default function Questions() {
  // 좌측 도넛 차트 데이터
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
  return (
    <div className="w-full flex flex-col items-center py-14 gap-12 justify-center">
      <div className="bg-white shadow-md rounded-2xl w-[70%] py-10 flex-col">
        <p className="text-lg font-semibold text-secondary pl-9 mb-7">
          # 난이도 분포
        </p>
        <div className="flex justify-between items-center w-[90%]  mx-auto">
          {/* 도넛 차트 */}
          <div className="w-[25%] h-48">
            <Doughnut data={donutData} options={donutOptions} />
          </div>

          {/* 오른쪽 레이블 표시 */}
          <div className="w-[60%] flex flex-col">
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

      <div className="bg-white shadow-md rounded-2xl w-[70%] flex">a</div>
    </div>
  );
}
