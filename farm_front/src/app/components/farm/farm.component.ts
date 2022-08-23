import { Farm } from './../../models/Farm'
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { DrawAddon } from '@common/draw'
import GeoJSON from 'ol/format/GeoJSON'
import { MapService } from '../../map.service'
import { BasemapComponent } from '../../basemap/basemap.component'
import { GeoJsonFeatureAddon } from '@common/feature'
import { pointClickStyle, GeoJsonFeature } from '@common/geolib'
import { MatDialog } from '@angular/material/dialog'
import { FarmService } from 'src/app/services/farm.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
})
export class FarmComponent implements OnInit {
  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []

  constructor(
    private _mapService: MapService,
    public dialog: MatDialog,
    private farmService: FarmService,
    private activatedRoute: ActivatedRoute
  ) {}

  farm
  id

  @Output() geometryEvent = new EventEmitter<GeoJsonFeatureAddon>()

  ngOnInit() {
    this._map = this._mapService.map
    this.retrieveFarm()
  }

  draw(type: 'Circle') {
    if (!this._map) return
    this._map.includeAddon(
      new DrawAddon({
        identifier: 'geometry_map',
        drawType: type,
        callback: (geometry) => {
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          this.handleNewGeometry(geo)
          this.sendGeometryToParent(geo)
        },
      })
    )
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    this.ngOnDestroy()
    const identifier = this.geometrySeed++
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    console.log('New geometry', geometry)
    this._geometries.push(geometry)
  }

  sendGeometryToParent(geometry): void {
    this.geometryEvent.emit(geometry)
  }

  retrieveFarm() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params.id
    })
    if (this.id > 0) {
      this.farmService.read(this.id).subscribe((response) => {
        this.farm = response
        this.handleNewGeometry(response.geometry)
      })
    }
  }

  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }
}
