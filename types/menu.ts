// Menu details and information code
export type Course = "STARTERS" | "MAINS" | "DESERTS";
export type MenuItem = {
    id: string;
  name: string;
  course: Course;
  description: string;
   price: number;
};