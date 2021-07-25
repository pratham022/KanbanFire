import { Board } from './board';

export interface BoardDialogData {
    board: Partial<Board>;
    enableDelete: boolean;
}
