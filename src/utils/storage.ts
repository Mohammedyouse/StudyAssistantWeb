// Mock storage utility using localStorage for development
export interface StudySession {
  id: string;
  user_id: string;
  title: string;
  content: string;
  transcription?: string;
  audio_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  due_date?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  study_preferences: {
    daily_goal?: number;
    preferred_subjects?: string[];
    reminder_time?: string;
  };
  created_at: string;
  updated_at: string;
}

const STORAGE_PREFIX = 'StudyAssistant_';

export async function getFromStorage<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored === null) {
      await setToStorage(key, defaultValue);
      return defaultValue;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export async function setToStorage<T>(key: string, value: T): Promise<void> {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

export async function getTasks(userId: string): Promise<Task[]> {
  const tasks = await getFromStorage<Task[]>('tasks_' + userId, []);
  return tasks;
}

export async function saveTask(userId: string, task: Task): Promise<void> {
  const tasks = await getTasks(userId);
  const existingIndex = tasks.findIndex(t => t.id === task.id);

  if (existingIndex >= 0) {
    tasks[existingIndex] = task;
  } else {
    tasks.push(task);
  }

  await setToStorage('tasks_' + userId, tasks);
}

export async function deleteTask(userId: string, taskId: string): Promise<void> {
  const tasks = await getTasks(userId);
  const filteredTasks = tasks.filter(t => t.id !== taskId);
  await setToStorage('tasks_' + userId, filteredTasks);
}

export async function getStudySessions(userId: string): Promise<StudySession[]> {
  const sessions = await getFromStorage<StudySession[]>('sessions_' + userId, []);
  return sessions;
}

export async function saveStudySession(userId: string, session: StudySession): Promise<void> {
  const sessions = await getStudySessions(userId);
  const existingIndex = sessions.findIndex(s => s.id === session.id);

  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }

  await setToStorage('sessions_' + userId, sessions);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  return await getFromStorage<UserProfile | null>('profile_' + userId, null);
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  await setToStorage('profile_' + profile.user_id, profile);
}