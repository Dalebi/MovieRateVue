<script setup>
import { items } from "./movies.json";
import { computed, reactive, ref } from "vue";


/* import font awesome icon component */
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar, faImage, faMasksTheater, faFilm } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";

/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
// import { StarIcon } from "@heroicons/vue/24/solid";

const MovieForm = ref({
  'name': String,
  'description': String,
  'image': String,
  'genres': Array,
  'in_movies': Boolean, 
});

const movies = reactive(items);

const bigStarClass = ((rating) => ({
  'text-gray-500': rating==3,
  'text-yellow-500': rating!=3,
}));
  
const  dialog = ref(false);

const rules = {
        required: value => !!value || 'El campo es requerido',
      };


function rateIt(item, rate){
  movies[item].rating = rate;    
}

function disableCurrent(rating, n){
 return n!=rating?'cursor-pointer':'cursor-auto';
}

const modalFormCreate = () => {

}

</script>

<template>
  <!-- This is where your template goes	-->
  <div class="app">
    <div class="movie-list bg-slate-700">
      <div class="w-10/12 lg:w-8/12 lg:px-2">
        <v-btn block  @click="dialog = true"><span class="font-semibold">Create {{ dialog }}</span></v-btn>
      </div>
    </div>
  </div>
  
        <v-dialog
        v-model="dialog"
        class="md:w-auto lg:w-3/6 "
      >
        <v-card >
          <v-form class="bg-slate-100">
          <v-card-title>
            <div  class="w-full flex items-center justify-start m-2 relative top-0 left-0">
            <FontAwesomeIcon :icon="faFilm" class="h-6 w-6  text-gray-500 float-left mr-2" ></FontAwesomeIcon>
            Registrar Pelicula
          </div>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Nombre" variant="outlined" :v-model="MovieForm.name" :rules="[rules.required]"></v-text-field>
            <v-text-field label="Imagen (URL)" variant="outlined" :v-model="MovieForm.image">
              <template v-slot:prepend-inner>
                <FontAwesomeIcon :icon="faImage" class="h-6 w-6  text-gray-500 float-left mr-2" ></FontAwesomeIcon>
              </template>
            </v-text-field>
            <v-textarea label="Descripcion" variant="outlined" :v-model="MovieForm.description" ></v-textarea>
            <v-select
              label="Genero" multiple :rules="[rules.required]"
              :items="['Accion', 'Comedia', 'Drama', 'Romance', 'Suspenso']"
              :v-model="MovieForm.genres"
            >
              <template v-slot:prepend-inner>
                  <FontAwesomeIcon :icon="faMasksTheater" class="h-6 w-6  text-gray-500 float-left mr-2" ></FontAwesomeIcon>
              </template>
          </v-select>
          </v-card-text>

            <input type="checkbox" :v-model="MovieForm.in_movies" class=" ml-4"> Esta en Cines?
            
            <!-- <v-checkbox label="Esta en Cines?" color="indigo"></v-checkbox> doesnt work -->
          <v-card-actions>

            <v-item-group
              class="w-full flex flex-row items-center justify-start m-2 relative top-0 left-0"
            >
              <div class="w-full lg:w-1/2">      
                <v-btn color="secondary" block @click="dialog = false">
                <FontAwesomeIcon :icon="faFloppyDisk" class="h-5 w-5  float-left mr-2" ></FontAwesomeIcon>
                Guardar</v-btn>
                </div>
              <div class="w-full lg:w-1/2">   
                <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
              </div>
          </v-item-group>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-dialog>
      
  <div class="flex flex-row bg-slate-700">

    <div class="basis-1/6  "></div>
    <div class="md:flex lg:basis-4/6 flex-row auto-rows-auto gap-0">
    
    <template v-for="(item, id) in movies" :key="item.id">
      
      <div class="lg:basis-1/3 relative  text-justify m-2 bg-slate-100 rounded-md">
          <div class="movie-item-image-wrapper ">
            
            <img :src="item.image" class="movie-item-image  rounded-t-md" alt="" />
            
            <div class="flex absolute right-1 top-1 m-2">
              <FontAwesomeIcon :icon="faStar" class="h-12 w-12 " :class="bigStarClass(item.rating)" ></FontAwesomeIcon>
              <span class="rating-text fa-inverse movie-item-image-star">{{ item.rating }}</span>
            </div>
            
          </div>
          
          <div class="h-64 p-2 rounded-b-md" >
            <p class=" text-xl text-left mb-2 ">{{ item.name }}</p>
            <div class="movie-item-genres-wrapper mb-2">
              <span
                v-for="genre in item.genres"
                :key="`${item.id}-${genre}`"
                class="movie-item-genre-tag"
                >{{ genre }}</span
              >
            </div>
            <p class="">{{ item.description }}</p>
            
            
            <p class="movie-item-rating-wrapper"> Rating: ({{item.rating}}/5)
              <template v-for="n in 5">
                <button @click="n!=item.rating?rateIt(id, n):null" :class="disableCurrent(item.rating, n)">
                  <template v-if="n<=item.rating"> 
                    <FontAwesomeIcon :icon="faStar" class="h-5 w-5  text-yellow-500 float-left ml-2" ></FontAwesomeIcon>
                  </template>
                  <template v-else >
                    <FontAwesomeIcon :icon="faStar" class="h-5 w-5  text-gray-500 float-left ml-2 " ></FontAwesomeIcon>
                  </template>
              </button>
              </template>
            </p>
        </div>
        </div>
      
    </template>  
  </div>
  <div class="basis-1/6 "></div>
  </div>  

</template>
<style>

app {
    @apply max-w-full flex items-center justify-center h-screen mx-auto;
}

.movie-list {
    @apply flex items-center justify-center lg:space-x-4;
}



.movie-item-image-wrapper {
    @apply h-[480px] overflow-hidden w-full relative flex justify-center;
}

.movie-item-image {
    @apply object-cover object-center h-[570px];
}


.movie-item-genres-wrapper {
    @apply flex items-center justify-start space-x-1;
}

.movie-item-genre-tag {
    @apply text-xs bg-indigo-500 text-white py-0.5 px-2 rounded-full;
}


.movie-item-rating-wrapper {
    @apply w-full flex items-center justify-start h-8 shrink-0 m-2 absolute bottom-0 left-0; 
}

.movie-item-image-star {
    @apply  w-full flex items-center justify-start shrink-0  absolute inset-x-4 inset-y-0  mb-1 ml-0.5 font-extrabold text-lg;
}    
</style>