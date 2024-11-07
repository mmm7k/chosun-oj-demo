// api/account.js
import axios from 'axios';

const BASE_URL = 'http://chosuncnl.shop:8000/api/v1/account';

export const checkUsername = async (username: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/check_username/`, {
      username,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error checking username:', error);
    throw error;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/check_email/`, { email });
    return response.data;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

export const checkStudentNumber = async (studentNumber: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/check_student_number/`, {
      student_number: studentNumber,
    });
    return response.data;
  } catch (error) {
    console.error('Error checking student number:', error);
    throw error;
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
