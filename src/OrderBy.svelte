<script lang="ts">
    export let currentOrdering;
    
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function updateOrderBy(option) {
        dispatch('update', {
            option: option
        });
    }
</script> 
<div class="dropdown">
    <button class="btn btn-lg btn-block btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {currentOrdering}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button class="dropdown-item" href="#" on:click={() => { updateOrderBy("Latest"); }}>Latest</button>
        <button class="dropdown-item" href="#" on:click={() => { updateOrderBy("Name (asc)"); }}>Name (asc)</button>
        <button class="dropdown-item" href="#" on:click={() => { updateOrderBy("Name (desc)"); }}>Name (desc)</button>
    </div>
</div>