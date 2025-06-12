import axios from 'axios';

const API_URL = 'https:/employee-462618.df.r.appspot.com/api/employees';

export const getEmployees = () => axios.get(API_URL)
export const postEmployee = (employee) => axios.post(API_URL,employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);