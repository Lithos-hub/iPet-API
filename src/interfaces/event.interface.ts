export interface CalendarEvent {
  id: string | number;
  title: string;
  bgColor: string;
  start: Date;
  end: Date;
  description: string;
  date_type: string;
  userId: string;
}
