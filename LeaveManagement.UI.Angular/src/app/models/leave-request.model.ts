export interface LeaveRequest {
  id?: number;
  userId: number;            
  userName: string;        
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: string;
}
