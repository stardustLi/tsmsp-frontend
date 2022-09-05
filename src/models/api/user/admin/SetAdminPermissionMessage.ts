import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { UserAdminPermission } from 'models/UserAdminPermission';

export class SetAdminPermissionMessage extends TSMSPMessage {
  userToken: string;
  permission: UserAdminPermission;
  constructor(userToken: string, permission: UserAdminPermission) {
    super();
    this.userToken = userToken;
    this.permission = permission;
  }
}
