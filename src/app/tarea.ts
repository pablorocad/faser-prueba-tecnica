export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
        public deleted: boolean,
        public selected: boolean
    ){}
}