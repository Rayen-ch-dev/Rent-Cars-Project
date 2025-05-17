
export type Car = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  bookings?: Booking[];
};

export type Booking = {
  id: string;
  userId: string;
  carId: string;
  date: Date;
};