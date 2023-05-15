<script setup>
import { ref, reactive } from "vue";

/* import font awesome icon component */
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { faStar, faImage, faMasksTheater, faFilm } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";


const props = defineProps({
    movies:{
        type:Object,
        default: {}
    },
    /*movie:{
        type:Object,
        default: null
    },*/
});


const MovieForm = ref({
  id: null,
  name: '',
  description: '',
  image: '',
  genres: [null],
  in_movies: '', 
  rating: '',
});


/*if(props.movie){
  Object.assign(MovieForm, movie);
}*/


const  myModal = ref(false);

const deleteMovie = (id) => {
  console.log('borrar', id);
    if(confirm('Realmente desea eliminar la pelicula ' + props.movies[id].name)){
        props.movies.splice(id, 1);
    }
}

const resetForm = () => {
  console.log('reseting');
  MovieForm.value = {
      id: null,
      name: '',
      description: '',
      image: '',
      genres: [null],
      in_movies: '', 
      rating: '',
    };
  }

  const saveMovie = () => {
  //If the MovieForm is in edit mode automatically save changes, the actions for "save" button its only to clean the form
  if(MovieForm.value.id == null){
    MovieForm.value.id = props.movies[props.movies.length-1].id+1;
    MovieForm.value.rating = 0;
  
    props.movies[props.movies.length] = MovieForm.value;
  }
  
  console.log('Movies Now', props.movies);  
  resetForm();

  myModal.value = false;
  
}//const saveMovie = ()..


const emit = defineEmits(['closeModal']);

defineExpose({
  myModal,
  MovieForm,
  deleteMovie,
});


</script>
<template>

<!-- This is where your template goes	-->
<div class="app">
    <div class="movie-list bg-slate-700">
      <div class="w-10/12 lg:w-8/12 lg:px-2">
        <button class="btn btn-block btn-primary" @click="myModal = true">
          <!-- <label class="btn" @click="myModal = true">open modal</label> -->
          <FontAwesomeIcon :icon="faFilm" class="fa-inverse h-6 w-6 float-left mr-2" ></FontAwesomeIcon>
          <span class="font-semibold">Registrar {{ myModal }}</span></button>
      </div>
    </div>
  </div>

<input type="checkbox" id="my-modal" v-model="myModal"  class="modal-toggle" />
<div class="modal">
  <div class="modal-box ">
    <!-- md:w-auto lg:w-3/6  -->

        <div class="card w-auto bg-base-100 shadow-xl"> 
          <form class="bg-slate-100" @submit.prevent="saveMovie">
          <div>
            <div  class="w-full flex items-center justify-start m-2 relative top-0 left-0">
            <span class="cursor-not-allowed " @click="emit('closeModal', 'No puedo pasar objetos ' + myModal)" title="Warning! Click to Close">
            <FontAwesomeIcon :icon="faFilm" class="h-6 w-6  text-gray-500 float-left mr-2" ></FontAwesomeIcon>
            </span>
            Registrar Pelicula
          </div>
        </div>
          <div>

            <label class="label">
              <span class="label-text">Nombre</span>  
            </label>
            <input type="text" class="input input-bordered input-sm w-full"   v-model="MovieForm.name" required />
             
            <label class="label mt-2">
              <span class="label-text">
                <FontAwesomeIcon :icon="faImage" class="h-6 w-6  text-gray-500 float-left mr-2" ></FontAwesomeIcon>
                Imagen (URL)</span>  
            </label>
             <input type="text" class="input input-bordered input-sm w-full"  v-model="MovieForm.image" />


             <label class="label mt-2">
              <span class="label-text">Descripcion</span>  
             </label>
             <textarea class="textarea textarea-bordered h-24 w-full" v-model="MovieForm.description"></textarea>

            
             <label class="label mt-2">
              <span class="label-text">
              <FontAwesomeIcon :icon="faMasksTheater" class="h-6 w-6  text-gray-500 float-left mr-2" ></FontAwesomeIcon>
              Genero</span>  
             </label>
              
            <select v-model="MovieForm.genres" class="select select-bordered h-10 w-full" multiple size="3"
              label="Genero" required              
            >
            <option v-for="genre in ['Accion', 'Comedia', 'Drama', 'Romance', 'Suspenso']" :value="genre">
              {{ genre }}
            </option> 
            </select> 
        
            <div  class="w-full flex items-center justify-start m-2 relative top-0 left-0">
              <input type="checkbox" v-model="MovieForm.in_movies" class="checkbox checkbox-primary  mt-2"> 
              <span class=" relative top-1 left-1 " >Esta en Cines?</span> 
            </div>
          </div>
    
            <!-- <v-checkbox label="Esta en Cines?" color="indigo"></v-checkbox> doesnt work -->
            <div class="modal-action">

            <div
              class="w-full flex flex-row items-center justify-start m-2 relative top-0 left-0 gap-1"
            >
              <div class="w-full lg:w-1/2">      
                <button class="btn btn-block btn-primary"  @click="dialog = false">
                <FontAwesomeIcon :icon="faFloppyDisk" class="h-5 w-5  float-left mr-2" ></FontAwesomeIcon>
                Guardar</button>
                </div>
              <div class="w-full lg:w-1/2">   
                <!-- <button color="primary" block @click="dialog = false">Close Dialog</button> -->
                <label for="my-modal" class="btn btn-block btn-secondary" @click="resetForm">Cerrar</label>
              </div>
            </div>
        </div>
        </form>
      </div>
    
      
      <!-- <label for="my-modal" class="btn">Yay!</label> -->
    
  </div>
</div>

</template>