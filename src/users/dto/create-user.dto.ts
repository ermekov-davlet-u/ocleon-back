export interface IUser {
  userName: string;
  password?: string;
  isRole?: 'ADMIN' | 'USER';
  branchId?: number; // добавляем для передачи филиала
}

export interface CreateUserDto {
  userName: string;
  password: string;
  isRole?: 'ADMIN' | 'USER';
  branchId?: number;
}
