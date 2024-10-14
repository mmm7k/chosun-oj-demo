'use client';

import { BiSolidAward } from 'react-icons/bi';

export default function Ranking() {
  // 포인트에 따른 티어 결정 함수
  const getTier = (points: number) => {
    if (points >= 5000) return 'Challenger';
    if (points >= 4000) return 'Grandmaster';
    if (points >= 3000) return `Diamond ${Math.ceil((4000 - points) / 500)}`;
    if (points >= 2000) return `Platinum ${Math.ceil((3000 - points) / 500)}`;
    if (points >= 1500) return 'Gold';
    if (points >= 1000) return 'Silver';
    return 'Bronze';
  };

  // 50명의 사용자 생성 및 누적 포인트 순으로 정렬
  const users = Array.from({ length: 50 }, (_, i) => {
    const points = Math.floor(Math.random() * 5000) + 1000; // 1000 ~ 6000 포인트 생성
    const tier = getTier(points); // 포인트에 따라 티어 결정
    return {
      rank: i + 1,
      tier,
      username: `User_${i + 1}`,
      points,
    };
  }).sort((a, b) => b.points - a.points); // 포인트 순으로 정렬 (내림차순)

  // 티어 색상 결정 함수
  const rankColor = (tier: string) => {
    if (tier.startsWith('Challenger')) return '#ff0000'; // 빨간색
    if (tier.startsWith('Grandmaster')) return '#ff4500'; // 주황색
    if (tier.startsWith('Diamond')) return '#00ffff'; // 청록색
    if (tier.startsWith('Platinum')) return '#00d9ff'; // 플래티넘 은색
    if (tier.startsWith('Gold')) return '#FFD700'; // 황금색
    if (tier.startsWith('Silver')) return '#C0C0C0'; // 은색
    return '#cd7f32'; // 청동색
  };

  return (
    <>
      <section className="w-screen h-44 bg-gradient-to-r from-[#9face6] to-[#74ebd5]">
        <div className="w-screen px-[10%] lg:px-[20%] h-44">
          <div className="h-44 flex justify-between items-center">
            <div
              className="flex flex-col gap-1 text-white text-2xl"
              style={{ textShadow: '1px 2px 3px rgba(0, 0, 0, 0.5)' }}
            >
              <span>🎉 빛나는 노력의 과정을 확인하세요</span>
            </div>
            <div className="w-[50%] h-[100%] relative">
              <img
                src={'/banner/rankingBanner.png'}
                alt="banner1"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#f0f4fc] w-full flex items-center justify-center">
        <div className="w-[90%] lg:w-[62%] pt-12 mb-44">
          <div className="w-full flex space-x-5 text-sm mb-3 text-gray-500 overflow-x-auto overflow-y-hidden">
            <div className="flex items-center">
              <BiSolidAward className="text-[1.5rem] text-[#ff0000]" />
              <span>Challenger 5000+</span>
            </div>
            <div className="flex items-center">
              <BiSolidAward className="text-[1.5rem] text-[#ff4500]" />
              <span>Grandmaster 4000+</span>
            </div>
            <div className="flex items-center">
              <BiSolidAward className="text-[1.5rem] text-[#00ffff]" />
              <span>Diamond 3000+</span>
            </div>
            <div className="flex items-center">
              <BiSolidAward className="text-[1.5rem] text-[#00d9ff]" />
              <span>Platinum 2000+</span>
            </div>
            <div className="flex items-center">
              <BiSolidAward className="text-[1.5rem] text-[#FFD700]" />
              <span>Gold 1500+</span>
            </div>
            <div className="flex items-center">
              <BiSolidAward className="text-[1.5rem] text-[#C0C0C0]" />
              <span>Silver 1000+</span>
            </div>
            <div className="flex items-center">
              <BiSolidAward className="text-[1.5rem] text-[#cd7f32]" />
              <span>Bronze</span>
            </div>
          </div>
          <table
            className="table-auto w-full bg-white text-center shadow-md text-sm border-separate"
            style={{ borderSpacing: '0 1px' }}
          >
            <thead className="font-semibold text-gray-700">
              <tr>
                <th className="p-4 border-b-[1px] border-t-[1px] border-gray-200">
                  Rank
                </th>
                <th className="p-4 border-b-[1px] border-t-[1px] border-gray-200">
                  Tier
                </th>
                <th className="p-4 border-b-[1px] border-t-[1px] border-gray-200">
                  User
                </th>
                <th className="p-4 border-b-[1px] border-t-[1px] border-gray-200">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {users.map((user, index) => (
                <tr key={user.username} className="hover:bg-gray-50  shadow-sm">
                  <td
                    className="p-4 border-l-[5px] "
                    style={{ borderColor: rankColor(user.tier) }}
                  >
                    {index + 1}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <BiSolidAward
                        className="text-[2rem]"
                        style={{ color: rankColor(user.tier) }}
                      />
                      <span>{user.tier}</span>
                    </div>
                  </td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
