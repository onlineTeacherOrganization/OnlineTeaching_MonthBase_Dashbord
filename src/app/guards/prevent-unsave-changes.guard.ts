import { CanActivateFn } from '@angular/router';
export const preventUnsaveChangesGuard: CanActivateFn = (component: any) => {
  if (component.editform?.dirty) {
    return confirm("Are you to continue ? Changes don't save ")
  }
  return true;
};
