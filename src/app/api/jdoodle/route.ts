import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { script, language: selectedLanguage } = await request.json();

  let language = '';
  let versionIndex = '';

  // 언어 설정 및 JDoodle API 버전 인덱스 설정
  switch (selectedLanguage) {
    case 'Python':
      language = 'python3';
      versionIndex = '5';
      break;
    case 'C':
      language = 'c';
      versionIndex = '6';
      break;
    case 'C++':
      language = 'cpp';
      versionIndex = '6';
      break;
    case 'Java':
      language = 'java';
      versionIndex = '5';
      break;
    default:
      return NextResponse.json(
        { error: 'Unsupported language selected' },
        { status: 400 },
      );
  }

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      clientId: process.env.NEXT_PUBLIC_JDOODLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_JDOODLE_SECRET,
      script,
      language,
      versionIndex,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error executing code:', error);
    return NextResponse.json(
      { error: 'Failed to execute code' },
      { status: 500 },
    );
  }
}
