import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumnos-abm',
  templateUrl: './alumnos-abm.component.html',
  styleUrls: ['./alumnos-abm.component.scss']
})
export class AlumnosABMComponent {
  alumnoForm: FormGroup;
  editing = false; // Flag to check if editing an existing student

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService) {
    this.alumnoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required]
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
}