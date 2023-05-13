import { model, Schema, Document } from 'mongoose';
import { Customer } from '@interfaces/account.interface';

const CustomerSchema: Schema = new Schema({
  email: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  empAccount: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },



});

export const AccountModel = model<Customer & Document>('Account', CustomerSchema);