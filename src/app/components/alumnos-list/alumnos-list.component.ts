import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss']
})
export class AlumnosListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'curso', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>();

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnoService.getAlumnos().subscribe(alumnos => {
      this.dataSource.data = alumnos;
    });
  }

  deleteAlumno(id: number) {
    this.alumnoService.deleteAlumno(id);
  }
}