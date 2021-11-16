import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[]; //Arreglo que almacena todas las tareas de la lista

	//Variables para guardar la información temporal de una nueva tarea
	nuevaTarea: FormGroup = new FormGroup({
		title: new FormControl(''),
		time: new FormControl('')
	});

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	addNew() {
		this.tareas.push(new Tarea(
			this.getNewNumber(),
			this.nuevaTarea.get('title').value,
			this.nuevaTarea.get('time').value
			));
	}

	getNewNumber():number{
		return this.tareas.length + 1;
	}
}
