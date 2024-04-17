import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumnos-abm',
  templateUrl: './alumnos-abm.component.html',
  styleUrls: ['./alumnos-abm.component.scss']
})
export class AlumnosABMComponent implements OnInit {
  alumnoForm: FormGroup;
  editing = false; // Flag to check if editing an existing student

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService, private route: ActivatedRoute,
    private router: Router) {
    this.alumnoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const alumnoId = params['id'];
      if (alumnoId) {
        this.loadAlumnoData(alumnoId);
      }
    });
  }

  onSubmit(): void {
    const alumnoData: Alumno = this.alumnoForm.value;
    if (alumnoData.id) {
      this.alumnoService.updateAlumno(alumnoData);
    } else {
      this.alumnoService.addAlumno(alumnoData);
    }
    this.clearForm();
  }

  deleteAlumno(): void {
    if (this.editing && this.alumnoForm.value.id) {
      this.alumnoService.deleteAlumno(this.alumnoForm.value.id);
      this.clearForm();
    }
  }

  clearForm(): void {
    this.alumnoForm.reset();
    this.editing = false;
  }

  cancel(): void {
    this.clearForm();
  }

  setAlumno(alumno: Alumno): void {
    this.alumnoForm.setValue(alumno);
    this.editing = true;
  }

  loadAlumnoData(id: number) {
    const alumno = this.alumnoService. getAlumnoById(id);
    if (alumno != undefined){
        this.alumnoForm.setValue({
            id: alumno.id,
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            email: alumno.email,
            curso: alumno.curso
          });
    }
  }
}