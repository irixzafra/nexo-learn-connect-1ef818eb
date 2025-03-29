
export type TestDataType = 'course' | 'user' | 'lesson' | 'message' | 'module' | 'profile' | 'assignment' | 'category' | 'enrollment' | 'quiz' | 'certificate' | 'payment';

export interface TestDataItem {
  id: string;
  name: string;
  createdAt: string;
  data: any;
}

export interface TestDataState {
  course: TestDataItem[];
  user: TestDataItem[];
  lesson: TestDataItem[];
  message: TestDataItem[];
  module: TestDataItem[];
  profile: TestDataItem[];
  assignment: TestDataItem[];
  category: TestDataItem[];
  enrollment: TestDataItem[];
  quiz: TestDataItem[];
  certificate: TestDataItem[];
  payment: TestDataItem[];
}

export interface TestDataContextType {
  testData: TestDataState;
  isGenerating: boolean;
  selectedItems: Record<TestDataType, string[]>;
  selectItem: (type: TestDataType, id: string, selected: boolean) => void;
  selectAllItems: (type: TestDataType, selected: boolean) => void;
  generateTestData: (type: TestDataType, count: number) => void;
  clearTestData: (type?: TestDataType) => void;
  deleteTestDataItem: (type: TestDataType, id: string) => void;
  deleteSelectedItems: (type: TestDataType) => void;
}
