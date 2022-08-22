import { Owner } from './Owner'
export interface Farm {
  id: number
  name: string
  geomtry: string
  area: number
  centroid: number[]
  // owner: Owner
}
