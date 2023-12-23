import { Gender } from '@miCommon/enums'
import { BaseModel } from '../models'
import { IAddress } from './IAddress'
import { IDate } from './IDate'
import { IEmail } from './IEmail'
import { IPhone } from './IPhone'
import { IQualification } from './IQualification'

export interface IPerson extends BaseModel {
  firstName: string
  lastName: string
  age?: number
  avatar?: string
  banner?: string
  active?: boolean
  addresses?: IAddress[]
  phoneNumbers: IPhone[]
  emails: IEmail[]
  qualifications: IQualification[]
  dates?: IDate[]
  tags?: string[]
  notes?: string[]
  gender?: Gender
  userDetail?: {
    userName: string
    userRole: string
    userEmail: string
  }
}
