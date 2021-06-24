const Tarea = require("./tarea");

class Tareas{
    _listado={};

    get listadoArray(){
      
        const listado=[];
        Object.keys(this._listado).forEach(key=>{                        
            listado.push(this._listado[key]);
        });

        return listado;

    }


    constructor() {
        this._listado={}
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas=[]){
        tareas.forEach(tarea=>{
            this._listado[tarea.id]=tarea;
        })

    }

    crearTarea(desc=''){
        const tarea=new Tarea(desc);
        this._listado[tarea.id]=tarea;

    }

    listadoCompleto(){
        console.log();
        this.listadoArray.forEach((tarea, i) => {
            const idx=`${(i+1)}`.green;
            const {desc,completadaEn}=tarea;
            const estado=(completadaEn)
                                    ? 'Completada'.green
                                    : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);

        });
    }

    listarPendientesCompletadas(completada=true){
        console.log();
        let contador=0;
        this.listadoArray.forEach(tarea => {
            const {desc,completadaEn}=tarea;
            const estado=(completadaEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            if (completada){
                if(completadaEn){
                    contador+=1;
                    console.log(`${contador+'.'.green} ${desc} :: ${completadaEn.green}`);
                }
            }else
            {
                if(!completadaEn){
                    contador+=1;
                    console.log(`${contador + '.'.green} ${desc} :: ${estado}`);
                    }
            }
        });
    }


    toggleCompletadas(ids=[]){
        ids.forEach(id=>{
            const tarea=this._listado[id];
            if (!tarea.completadaEn){
                tarea.completadaEn=new Date().toISOString();
            }
        })

        this.listadoArray.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadaEn=null;
            }
        })
    }
}



module.exports=Tareas;