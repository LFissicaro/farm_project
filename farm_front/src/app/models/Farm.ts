import { GeoJsonFeatureAddon } from '@common/feature'
import { Owner } from './Owner'
export interface Farm {
  id: number
  name: string
  geometry
  area: number
  centroid: []
  // owner: Owner
  owner: number
}
