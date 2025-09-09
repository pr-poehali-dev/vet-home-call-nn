export interface FormData {
  name: string;
  phone: string;
  address: string;
  description: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  urgent?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  photo: string;
  rating: number;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  photo: string;
  petName: string;
}

export interface SuccessStory {
  id: string;
  petName: string;
  problem: string;
  solution: string;
  beforeImage: string;
  afterImage: string;
  timeframe: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface District {
  id: string;
  name: string;
  travelTime: string;
  additionalCost?: string;
}

export interface AnimationProps {
  getAnimationClass: (id: string, animation: string) => string;
}

export interface FormProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors?: FormErrors;
  isLoading?: boolean;
}

export interface PopupProps {
  isExitPopupOpen: boolean;
  setIsExitPopupOpen: (open: boolean) => void;
}

export type SetFormData = React.Dispatch<React.SetStateAction<FormData>>;
export type SetIsDialogOpen = React.Dispatch<React.SetStateAction<boolean>>;
export type SetIsExitPopupOpen = React.Dispatch<React.SetStateAction<boolean>>;

export interface ComponentProps extends AnimationProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends ComponentProps {
  id?: string;
}