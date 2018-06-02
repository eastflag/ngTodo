export class TodoVO {
  todo_id: number;
  isFinished: boolean;
  todo: string;
  created: string;
  updated: string;

  isEdited: boolean; // 수정중 상태
}
