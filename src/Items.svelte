<script lang="ts">
  export let items;

  import { onMount } from "svelte";
  import Item from "./Item.svelte";
  import FrameworkFilter from "./FrameworkFilter.svelte";
  import OrderBy from './OrderBy.svelte'
  import { query } from "./query";

  let isLoaded = false;
  let originalData = [];
  let displayedData = [];

  let currentOrdering = "Latest";
  let search = "";
  let frameworkFilter = [];

  const itemsToLoad = 100;

  onMount(async () => {
    await loadItems();
  });

  async function loadItems() {
    await query(itemsToLoad)
      .then((r) => r.json())
      .then((data) => {
        for(let i=0; i<data.objects.length; i++) {
          if("keywords" in data.objects[i].package) {
            data.objects[i].package.preview = [];
            for(const preview_raw of data.objects[i].package.keywords) {
              if(preview_raw.includes("preview")) {
                const preview_parsed = preview_raw.split("|");
                console.log(preview_parsed)
                data.objects[i].package.preview.push({
                  url: preview_parsed[1],
                  ...(preview_parsed.length > 2 ? { label: preview_parsed[2] } : {})
                })
              }
            }
          }
        }
        originalData = data.objects;
        displayedData = data.objects;

        filterAndOrder();
        isLoaded = true;
      });
  }

  function updateOrderBy(event) {
    currentOrdering = event.detail.option;
    filterAndOrder();
  }

  function filterAndOrder() {
    displayedData = originalData.filter(combinedFilters);

    if (currentOrdering == "Latest") {
      orderByLatest();
    }
    else if(currentOrdering == "Name (asc)") {
      orderByNameAsc();
    }
    else if(currentOrdering == "Name (desc)") {
      orderByNameDesc();
    }
  }

  function combinedFilters(item) {
    if (frameworkFilter.length > 0) {
      return filterSearch(item) && (filterAngular(item) || filterVue(item) || filterSvelte(item) || filterReact(item));
    }
    else {
      return filterSearch(item);
    }
  }

  function filterSearch(item) {
    return item.package.name.indexOf(search) !== -1
  }

  function filterAngular(item) {
    if(frameworkFilter.indexOf('angular') !== -1) {
      if("keywords" in item.package) {
        return item.package.keywords.includes('Angular') || 
              item.package.keywords.includes('angular');
      }
    }
    return false
  }

  function filterVue(item) {
    if(frameworkFilter.indexOf('vue') !== -1) {
      if("keywords" in item.package) {
        return item.package.keywords.includes('Vue') || 
              item.package.keywords.includes('vue') || 
              item.package.keywords.includes('vue.js') || 
              item.package.keywords.includes('Vue.js');
      }
    }
    return false
  }

  function filterSvelte(item) {
    if(frameworkFilter.indexOf('svelte') !== -1) {
      if("keywords" in item.package) {
        return item.package.keywords.includes('Svelte') || 
              item.package.keywords.includes('svelte') || 
              item.package.keywords.includes('Svelte Native') || 
              item.package.keywords.includes('svelte native');
      }
    }
    return false
  }

  function filterReact(item) {
    if(frameworkFilter.indexOf('react') !== -1) {
      if("keywords" in item.package) {
        return item.package.keywords.includes('react') || 
              item.package.keywords.includes('React');
      }
    }
    return false
  }

  function orderByLatest() {
    displayedData = displayedData.sort((a, b) => (a.package.date > b.package.date) ? -1 : 1)
  }

  function orderByNameAsc() {
    displayedData = displayedData.sort((a, b) => (a.package.name > b.package.name) ? 1 : -1);
  }

  function orderByNameDesc() {
    displayedData = displayedData.sort((a, b) => (a.package.name > b.package.name) ? -1 : 1);
  }

  function toggleFramework(event) {
    const framework = event.detail.framework;
    let index = frameworkFilter.indexOf(framework);
    if (index !== -1) {
      frameworkFilter.splice(index, 1);
      frameworkFilter = [...frameworkFilter]
    }
    else {
      frameworkFilter = [...frameworkFilter, framework]
    }

    filterAndOrder();
  }

</script>

<div class="d-flex flex-column-fluid">
	<div class="container">
    <h3 class="display-3 mt-5 mb-5">Plugins</h3>
    <div class="row">
      <div class="col-7">
        <div class="form-group">
          <input type="text" class="form-control form-control-lg" placeholder="Search for a plugin..." bind:value={search} on:input={filterAndOrder}>
        </div>
      </div>
      <div class="col-3 text-center">
        <FrameworkFilter on:toggle={toggleFramework} frameworkFilter={frameworkFilter} />
      </div>
      <div class="col-2 text-right">
        <OrderBy on:update={updateOrderBy} currentOrdering={currentOrdering} />
      </div>
    </div>
    {#if isLoaded}
      {#if displayedData.length > 0}
        <div class="row">
          {#each displayedData as item}
            <Item {item} />
          {/each}
        </div>
      {:else}
        <h3 class="display-3 text-center">No plugins found...</h3>
      {/if}
    {:else}
      <h3 class="display-3 text-center">Loading...</h3>
    {/if}
	</div>
</div>