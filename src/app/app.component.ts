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

	//Metodo para crear una nueva tarea en la lista
	addNewRow() {
		//Verificamos nuestros datos
		if(this.checkFormValues()){
			this.tareas.push(new Tarea(
				this.getNewNumber(),
				this.nuevaTarea.get('title').value,
				this.nuevaTarea.get('time').value,
				false
				));
		}

		//Vaciamos nuestras variables del form
		this.nuevaTarea.get('title').reset('');
		this.nuevaTarea.get('time').reset('');
	}

	//Metodo para obtener el número de tarea disponible
	getNewNumber():number{
		return this.tareas.length + 1;
	}

	//Metodo para verificar que el form este lleno
	checkFormValues():Boolean {
		if(this.nuevaTarea.get('title').value == ''){
			alert('Ingrese un titulo para la tarea');
			return false;
		}
		
		if(this.nuevaTarea.get('time').value <= 0){
			alert('Ingrese un tiempo para la tarea');
			return false;
		}

		return true;
	}

	//Metodo para eliminar una tarea
	deleteRow(tarea: Tarea){
		//Variable que nso indicara si se eliminara la tarea
		const response = confirm(`¿Desea eliminar la tarea "${tarea.titulo}"?`);

		if(response){
			tarea.deleted = true;
		}
	}

	//Ordenamiento de la lista
	sortList(type: boolean){
		if(type){
			this.tareas.sort((task1, task2) => (task1.minutos > task2.minutos) ? 1 : -1);
		}
		else{
			this.tareas.sort((task1, task2) => (task1.minutos < task2.minutos) ? 1 : -1);
		}
	}
}
