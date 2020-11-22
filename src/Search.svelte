<script lang="ts">
    export let search;
    
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function filterAndOrder(option) {
        dispatch('update', {
            option: option
        });
    }
</script> 

<input type="text" class="form-control form-control-lg" placeholder="Search for a plugin..." bind:value={search} on:input={filterAndOrder}>