export interface FullStudy {
  patientPk: number;
	patientId: string;
	personMiddleName: string;
	personFamilyName: string;
	personGivenName: string;
	patientSex: string;
	studyPk: string;
	createdTime: Date;
	studyDate: string;
	studyId: string;
	iuid: string;
	desc: string;
	modality: string;
  numInstances: number;
	institution: string;
	email: string;
}

export interface FullStudyCount {
	studyCount: number;
	instancesCount: number;
	modalityCount: number;
  }