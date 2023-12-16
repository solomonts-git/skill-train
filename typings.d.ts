type Trianing = {
  _id: string;
  trainingname: string;
};
type Trianings = {
  _id: string;
  trainingname: string;
  imagePath: string;
};
type PartnerT = {
  _id: string;
  organizationname: string;
  org_type: string;
  org_logo: string;
  description: string;
};
type TrainerT = {
  _id: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  specialization: string;
  exprience: number;
  affiliation: string;
  photo: string;
  biodesc: string;
  gender: string;
};
type EventT = {
  _id: string;
  photo: string;
  eventname: string;
  eventtype: string;
  organizer: string;
  startdate: string;
  enddate: string;
  address: string;
  description: string;
};
type TrianingType = {
  data: Trianing[];
  setData: React.Dispatch<React.SetStateAction<Trianing[]>>;
};
type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isactive: string;
  role: string;
  photo: string;
};
type TraineeT = {
  title: string;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  trainingname: string;
  trainerorg: string;
  status: string;
  year: number;
  photo: string;
  gender: string;
  biodesc: string;
};
