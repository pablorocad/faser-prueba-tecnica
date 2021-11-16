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

	//Indicador si todas las tareas fueron seleccionadas
	checkAll = false;

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
				false,
				false
				));

			//Vaciamos nuestras variables del form
			this.nuevaTarea.get('title').reset('');
			this.nuevaTarea.get('time').reset('');
		}

		
	}

	//Obtener el número de tarea disponible
	getNewNumber():number{
		return this.tareas.length + 1;
	}

	//Verificar que el form este lleno
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

	//Eliminar una tarea
	deleteRow(tarea: Tarea){
		//Variable que nos indicara si se eliminara la tarea
		const response = confirm(`¿Desea eliminar la tarea "${tarea.titulo}"?`);

		if(response){
			tarea.deleted = true;
		}
	}

	//Ordenamiento de la lista
	sortList(type: boolean){
		if(type){ //Si es true ordenara ascendente
			this.tareas.sort((task1, task2) => (task1.minutos > task2.minutos) ? 1 : -1);
		}
		else{ //Si es false ordenara descendentemente
			this.tareas.sort((task1, task2) => (task1.minutos < task2.minutos) ? 1 : -1);
		}
	}

	//Cambia el atributo para saber si la tarea fue seleccionada
	selectTask(tarea: Tarea){
		tarea.selected = !tarea.selected;
	}

	//Recorremso el arreglo de tareas para seleccionarlas
	selectAllTasks(){
		if(this.checkAll){
			for(let tarea of this.tareas){
				if(!tarea.deleted){
					tarea.selected = false;
				}
			}
			this.checkAll = false;
		}
		else{
			for(let tarea of this.tareas){
				if(!tarea.deleted){
					tarea.selected = true;
				}
			}
			this.checkAll = true;
		}
	}
}
