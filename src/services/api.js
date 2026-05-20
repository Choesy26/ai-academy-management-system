import { supabase, hasSupabaseConfig } from '../lib/supabase';

// Mock Data Fallbacks
const MOCK_STUDENTS = [
  { id: 1, name: '김민준', school: '강남중', grade: '중2', goal: '성적향상', parentType: '분석형', sensitivity: '보통', lastReport: '2026-04-30' },
  { id: 2, name: '이지은', school: '서초중', grade: '중1', goal: '흥미유발', parentType: '격려형', sensitivity: '낮음', lastReport: '2026-05-02' },
  { id: 3, name: '박도윤', school: '역삼중', grade: '중3', goal: '선행진도', parentType: '결과중심형', sensitivity: '높음', lastReport: '2026-04-28' },
  { id: 4, name: '최유나', school: '대치중', grade: '중2', goal: '성적향상', parentType: '분석형', sensitivity: '보통', lastReport: '2026-05-15' },
  { id: 5, name: '정시우', school: '도곡중', grade: '중1', goal: '성적향상', parentType: '참여형', sensitivity: '낮음', lastReport: '2026-05-10' },
];

const MOCK_ANALYSES = [
  { name: '김민준', school: '강남중', test: '2026 1학기 중간고사', date: '방금 전', score: 85, weakness: '이차방정식 활용' },
  { name: '이지은', school: '서초중', test: '2026 1학기 중간고사', date: '2시간 전', score: 72, weakness: '인수분해' },
  { name: '박도윤', school: '역삼중', test: '2025 2학기 기말고사', date: '어제', score: 90, weakness: '계산 실수' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getStudents = async (searchQuery = '') => {
  if (hasSupabaseConfig) {
    let query = supabase.from('students').select('*').order('created_at', { ascending: false });
    
    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,school.ilike.%${searchQuery}%`);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching students:', error);
      return [];
    }
    return data;
  }
  
  // Fallback to Mock Data with simulated network delay
  await delay(600);
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    return MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) || 
      s.school.toLowerCase().includes(lowerQuery)
    ).sort((a, b) => b.id - a.id);
  }
  return [...MOCK_STUDENTS].sort((a, b) => b.id - a.id);
};

export const addStudent = async (studentData) => {
  if (hasSupabaseConfig) {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select();
      
    if (error) {
      console.error('Error inserting student:', error);
      throw error;
    }
    return data[0];
  }
  
  // Fallback to Mock Data
  await delay(600);
  const newStudent = {
    id: Date.now(),
    ...studentData,
    lastReport: studentData.lastReport || new Date().toISOString().split('T')[0]
  };
  MOCK_STUDENTS.push(newStudent);
  return newStudent;
}

export const getRecentAnalyses = async () => {
  if (hasSupabaseConfig) {
    const { data, error } = await supabase.from('analyses').select('*').order('created_at', { ascending: false }).limit(3);
    if (error) {
      console.error('Error fetching analyses:', error);
      return [];
    }
    return data;
  }
  
  await delay(500);
  return MOCK_ANALYSES;
};

export const getStudentById = async (id) => {
  if (hasSupabaseConfig) {
    const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }
  await delay(300);
  return MOCK_STUDENTS.find(s => String(s.id) === String(id)) || null;
};
