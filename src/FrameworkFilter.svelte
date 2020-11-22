<script lang="ts">
    export let frameworkFilter;
    
    import { createEventDispatcher } from 'svelte';

    import AngularIcon from './icons/AngularIcon.svelte';
    import VueIcon from './icons/VueIcon.svelte';
    import SvelteIcon from './icons/SvelteIcon.svelte';
    import ReactIcon from './icons/ReactIcon.svelte';

    const dispatch = createEventDispatcher();

    function toggleFramework(framework) {
        dispatch('toggle', {
            framework: framework
        });
    }
</script> 

<style>

    .framework-angular {
      background-color: #f1d3d4; 
      border-color: #FFFFFF
    }
  
    .framework-vue {
      background-color: #caf1e5; 
      border-color: #FFFFFF
    }
  
    .framework-svelte {
      background-color: #ffd6cf; 
      border-color: #FFFFFF
    }
  
    .framework-react {
      background-color: #d0f6fe; 
      border-color: #FFFFFF
    }
  
    .disabled {
      background-color: rgb(226, 226, 226); 
      fill-opacity: 60%;
    }
  
</style>

<div class="btn-group btn-group-lg" role="group" aria-label="Framework">
    <button href="#" class="svg-icon btn framework-angular" on:click={() => toggleFramework('angular')} class:disabled="{!frameworkFilter.includes('angular')}">
        <AngularIcon />
    </button>
    <button class="svg-icon btn framework-vue" on:click={() => toggleFramework('vue')} class:disabled="{!frameworkFilter.includes('vue')}">
        <VueIcon />
    </button>
    <button  class="svg-icon btn framework-svelte" on:click={() => toggleFramework('svelte')} class:disabled="{!frameworkFilter.includes('svelte')}">
        <SvelteIcon />
    </button>
    <button class="svg-icon btn framework-react" on:click={() => toggleFramework('react')} class:disabled="{!frameworkFilter.includes('react')}">
        <ReactIcon />
    </button>
</div>