interface DataType {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

interface UserDatasType {
  data?: DataType;
  errors?: string;
}

export type { DataType, UserDatasType };
