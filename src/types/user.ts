// src/types/user.ts
import { ServiceTerritory } from "./sf";

export interface UserProfile {
  Id: string;
  Name: string;
  UserType: string;
}

export interface UserRecord {
  Id: string;
  Name: string;
  Email: string;
  ProfileId: string;
  Employee_Id__c?: string;
}

export interface EmployeeRecord {
  Id: string;
  Emp_Clinic__c?: string;
  Emp_Clinic__r?: {
    Branch_Code__c: string;
  };
}

export interface PermissionSetRecord {
  Id: string;
  Name: string;
  Label: string;
}

export interface UserContext {
  user: UserRecord | null;
  employee: EmployeeRecord | null;
  profile: UserProfile | null;
  permissionSets: PermissionSetRecord[];
  isSuperUser: boolean;
  mainClinic: ServiceTerritory | null;
  tempClinics: ServiceTerritory[];
  nearClinics: ServiceTerritory[];
}




// role mapping based on clinic access and user type
export type ClinicAccessLevel = "EDIT" | "VIEW";
export type ClinicRole = "ALL" | "MAIN" | "TEMP" | "NEAR";

export interface MappedClinic {
  clinic: ServiceTerritory;
  access: ClinicAccessLevel;
  role: ClinicRole;
}
