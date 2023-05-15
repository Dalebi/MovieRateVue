<script setup>
import { items } from "./movies.json";
import { computed, onMounted, reactive, ref } from "vue";

/* import font awesome icon component */
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk, faPenToSquare , faTrashAlt, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import FormCreateMovie from "./partials/FormCreateMovie.vue";

/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
// import { StarIcon } from "@heroicons/vue/24/solid";

const formCreateMovie = ref(null);

const bigStarClass = ((rating) => ({
  'text-gray-500': rating==3,
  'text-yellow-500': rating!=3,
}));
  

const movies = reactive(items);

//Intentionally left here to show how the object movies work between parent and childs components
function rateIt(item, rate){
  console.log('rating', movies);
  movies[item].rating = rate;    
}

function disableCurrent(rating, n){
 return n!=rating?'cursor-pointer':'cursor-auto';
}


function muestraResultado(res){
  //Cant pass the object itself so instead use the component reference instead
    console.log('RES', res, formCreateMovie.value.myModal);
    formCreateMovie.value.myModal=false;
  }


//onMounted(()=>{ .. });
</script>

<template>
  

  <FormCreateMovie :movies="movies" ref="formCreateMovie" @close-modal="(p)=>muestraResultado(p)"></FormCreateMovie>

  <div class="flex flex-row bg-slate-700">

    <div class="basis-1/6  "></div>
    <div class="md:flex lg:basis-4/6 flex-row auto-rows-auto flex-wrap  gap-0" :class="movies.length/3==1?'items-center justify-center':''	">
    
    <template v-for="(item, id) in movies" :key="item.id">
      
      <div class="lg:basis-1/3 relative max-w-sm  text-justify p-2 bg-slate-700 rounded-md " >
          <div class="movie-item-image-wrapper ">
            
            <img :src="item.image" class="movie-item-image  rounded-t-md" alt="" />
            
            <div class="flex absolute right-1 top-1 m-2">
              <FontAwesomeIcon :icon="faStar" class="h-12 w-12 " :class="bigStarClass(item.rating)" ></FontAwesomeIcon>
              <span class="rating-text fa-inverse movie-item-image-star">{{ item.rating }}</span>
            </div>
            
          </div>
          
          <div class="h-64 p-2 rounded-b-md bg-slate-200" >
            <p class=" text-xl text-left mb-2 overflow-auto h-8 ">{{ item.name }}</p>
            <div class="movie-item-genres-wrapper mb-2">
              <span
                v-for="genre in item.genres"
                :key="`${item.id}-${genre}`"
                class="movie-item-genre-tag"
                >{{ genre }}</span
              >
            </div>
            <p class=" overflow-auto  h-32 ">{{ item.description }}</p>
            
            
            <div class=" flex w-11/12  mb-2 ml-3 absolute bottom-0 left-0">
              <div class="movie-item-rating-wrapper"> Rating: ({{item.rating}}/5)                
                  <button v-for="n in 5" @click="n!=item.rating?rateIt(id, n):null"  :class="disableCurrent(item.rating, n)">
                      <FontAwesomeIcon :icon="faStar" class="h-4 w-4 float-left ml-2" 
                      :class="[
                        n <= item.rating ? 'text-yellow-500' : 'text-gray-500',
                      ]"
                      />                      
                </button>              
              </div>

                <div class="helpers-buttons-wrappers " >
                  <button class="helper-button" @click="formCreateMovie.myModal=true;formCreateMovie.MovieForm=item" >
                      <FontAwesomeIcon :icon="faEdit" 
                        class="h-3 w-3 text-white  " ></FontAwesomeIcon></button>
                  <button class="helper-button" @click="formCreateMovie.deleteMovie(id);">
                      <FontAwesomeIcon :icon="faTrashCan" 
                        class="h-3 w-3 text-white  " ></FontAwesomeIcon></button>
                </div>
              </div>
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
    @apply w-8/12 flex items-center justify-start h-8 shrink-0  text-sm ; 
}

.movie-item-image-star {
    @apply  w-full flex items-center justify-start shrink-0  absolute inset-x-4 inset-y-0  mb-0 ml-0.5 font-extrabold text-lg;
}   

.helpers-buttons-wrappers{
  @apply w-4/12 flex justify-end gap-1 text-sm; 

}

.helper-button {
  @apply  flex rounded-full bg-blue-600 h-7 w-7 relative items-center justify-center;
}
</style>  