import { ObjectId, Types } from "mongoose";
import { Auth } from "./auth.interface";

// Array interfaces
import { Pet } from "./pet.interface";
import { Vet } from "./vet.interface";
import { CalendarEvent } from "./calendar.interface";
import { Contact } from "./contact.interface";
import { Note } from "./note.interface";

export interface User extends Auth {
  createdAt?: string;
  pets: Types.DocumentArray<Pet>;
  events: Types.DocumentArray<CalendarEvent>;
  vets: Types.DocumentArray<Vet>;
  contacts: Types.DocumentArray<Contact>;
  notes: Types.DocumentArray<Note>;
}

export interface LoginUser {
  _id: Types.ObjectId;
  email: string;
}

export interface UserPlusToken {
  token: string;
  user: LoginUser;
}
