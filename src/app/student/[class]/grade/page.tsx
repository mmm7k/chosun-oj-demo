'use client';
import { Doughnut, Bar } from 'react-chartjs-2';
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
  Legend,
);

// 좌측 도넛 차트 데이터
const donutData = {
  labels: [
    '알고리즘 01 분반',
    '알고리즘 02 분반',
    '네트워크 보안 01 분반',
    '네트워크 보안 02 분반',
  ],
  datasets: [
    {
      label: '학생 수',
      data: [50, 40, 30, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

// 도넛 차트 옵션
const donutOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        padding: 12,
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      bottom: 0,
    },
  },
};

export default function Questions() {
  return (
    <div className="w-full flex flex-col items-center py-14 gap-12 justify-center  ">
      <div className="bg-white shadow-md rounded-2xl w-[70%] flex ">
        <div className="w-[20%]">
          <Doughnut data={donutData} options={donutOptions} />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl w-[70%] flex">a</div>
    </div>
  );
}
