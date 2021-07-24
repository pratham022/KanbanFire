import { Workspace } from './workspace';
export interface WorkspaceDialogData {
    workspace: Partial<Workspace>;
    enableDelete: boolean;
}
