import { UserName } from 'models/fields';

export class UserAdminPermission {
  userName: UserName;
  admin: boolean;
  createPlace: boolean;
  readTraceId: boolean;
  viewAppeals: boolean;
  setRiskAreas: boolean;
  setPolicy: boolean;
  manageNucleicAcidTestPoints: boolean;
  finishNucleicAcidTest: boolean;
  assignColor: boolean;
  constructor(
    userName: UserName = '',
    admin = false,
    createPlace = false,
    readTraceId = false,
    viewAppeals = false,
    setRiskAreas = false,
    setPolicy = false,
    manageNucleicAcidTestPoints = false,
    finishNucleicAcidTest = false,
    assignColor = false
  ) {
    this.userName = userName;
    this.admin = admin;
    this.createPlace = createPlace;
    this.readTraceId = readTraceId;
    this.viewAppeals = viewAppeals;
    this.setRiskAreas = setRiskAreas;
    this.setPolicy = setPolicy;
    this.manageNucleicAcidTestPoints = manageNucleicAcidTestPoints;
    this.finishNucleicAcidTest = finishNucleicAcidTest;
    this.assignColor = assignColor;
  }

  hasAny() {
    return (
      this.admin ||
      this.createPlace ||
      this.readTraceId ||
      this.viewAppeals ||
      this.setRiskAreas ||
      this.setPolicy ||
      this.manageNucleicAcidTestPoints ||
      this.finishNucleicAcidTest ||
      this.assignColor
    );
  }
}
