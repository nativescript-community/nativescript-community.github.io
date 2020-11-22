<script lang="ts">
  export let item;

  import IOSIcon from './icons/IOSIcon.svelte';
  import AndroidIcon from './icons/AndroidIcon.svelte';
  import AngularIcon from './icons/AngularIcon.svelte';
  import VueIcon from './icons/VueIcon.svelte';
  import SvelteIcon from './icons/SvelteIcon.svelte';
  import ReactIcon from './icons/ReactIcon.svelte';
  import DocsIcon from './icons/DocsIcon.svelte';
  import GitHubIcon from './icons/GitHubIcon.svelte';

  function isValidPlugin(item) {
    return "name" in item.package && "description" in item.package && "keywords" in item.package && "links" in item.package;
  }

  function hasIOS(item) {
    return item.package.keywords.includes("ios") || item.package.keywords.includes("iOS");
  }

  function hasAndroid(item) {
    return item.package.keywords.includes("android") || item.package.keywords.includes("Android");
  }

  function hasAngular(item) {
    return item.package.keywords.includes("Angular") || item.package.keywords.includes("angular");
  }

  function hasVue(item) {
    return item.package.keywords.includes("Vue") || item.package.keywords.includes("vue") || item.package.keywords.includes("vue.js") || item.package.keywords.includes("Vue.js");
  }

  function hasSvelte(item) {
    return item.package.keywords.includes("Svelte") || item.package.keywords.includes("svelte");
  }

  function hasReact(item) {
    return item.package.keywords.includes("React") || item.package.keywords.includes("react");
  }

  function hasDocs(item) {
    return "homepage" in item.package.links;
  }

  function hasRepo(item) {
    return "repository" in item.package.links;
  }

  function copyCommand(name) {
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "linear",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

    navigator.clipboard.writeText(`ns plugin add ${name}`)
    .then(() => {
      toastr.success("Plugin install command has been copied.", "Copied!");
    })
    .catch(err => {
      console.error('Async: Could not copy text: ', err);
    });
  }
</script>
{#if isValidPlugin(item) }
<div class="col-xl-4">
  <!--begin::Nav Panel Widget 3-->
  <div class="card card-custom gutter-b">
      <div class="card-header border-0 pt-5 ribbon ribbon-clip ribbon-right">
        <a href={item.package.links.npm} class="ribbon-target" style="top: 12px; background-color: white;">
          <span class="ribbon-inner bg-secondary"></span>
          <span class="text-dark-75">{item.package.version}</span>
        </a>
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-dark">{item.package.name.replace(`@${item.package.scope}/`, '')}</span>
          <span class="text-dark-65 mt-3 font-size-lg">{item.package.description}</span>
        </h3>
        {#if item.package.preview}
        <div class="row justify-content-between">
          {#each item.package.preview as preview}
            <div class="col text-center">
              <img alt="iOS Demo" class="rounded w-100 mt-5" src={preview.url} />
              {#if preview.label}
                <span class="label label-inline mt-5">{preview.label}</span>
              {/if}
            </div>
          {/each}
        </div>
        {/if}
      </div>
     
      <!--begin::Body-->
      <div class="card-body">
          <div class="row justify-content-around">
            <div class="col-3">
              <div class="btn-group btn-group-sm" role="group" aria-label="Platforms">
                {#if hasIOS(item) }
                  <a href="#" class="svg-icon btn btn-secondary disabled" style="background-color: #e2e2e2; border-color: #FFFFFF; pointer-events: none;">
                    <IOSIcon />
                  </a>
                {/if}
                {#if hasAndroid(item) }
                  <a href="#" class="svg-icon btn btn-secondary disabled" style="background-color: #e8f3d6; border-color: #FFFFFF; pointer-events: none;">
                    <AndroidIcon />
                  </a>
                {/if}
              </div>
            </div>
            <div class="col-6 text-center">
              <div class="btn-group btn-group-sm" role="group" aria-label="Framework">
                {#if hasAngular(item) }
                  <a href="#" class="svg-icon btn btn-outline-secondary" style="background-color: #f1d3d4; border-color: #FFFFFF; pointer-events: none;">
                    <AngularIcon />
                  </a>
                {/if}
                {#if hasVue(item) }
                  <a href="#" class="svg-icon btn btn-outline-secondary" style="background-color: #caf1e5; border-color: #FFFFFF; pointer-events: none;">
                    <VueIcon />
                  </a>
                {/if}
                {#if hasSvelte(item) }
                  <a href="#" class="svg-icon btn btn-outline-secondary" style="background-color: #ffd6cf; border-color: #FFFFFF; pointer-events: none;">
                    <SvelteIcon />
                  </a>
                {/if}
                {#if hasReact(item) }
                  <a href="#" class="svg-icon btn btn-outline-secondary" style="background-color: #d0f6fe; border-color: #FFFFFF; pointer-events: none;">
                    <ReactIcon />
                  </a>
                {/if}
              </div>
            </div>
            <div class="col-3">
              <div class="btn-group btn-group-sm float-right" role="group" aria-label="Links">
                {#if hasDocs(item) }
                  <a href={item.package.links.npm} class="svg-icon btn btn-outline-secondary">
                    <DocsIcon />
                  </a>
                {/if}
                {#if hasRepo(item )}
                  <a href={item.package.links.repository} class="svg-icon btn btn-outline-secondary" >
                    <GitHubIcon />
                  </a>
                {/if}
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <div class="input-group">
                <input type="text" class="form-control text-dark-75" value="ns plugin add {item.package.name}" disabled/>
                <div class="input-group-append">
                  <button on:click={() => { copyCommand(item.package.name) }} class="btn btn-secondary"><i class="la la-copy"></i></button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <!--end::Body-->
  </div>
  <!--end::Nav Panel Widget 3-->
</div>
{/if}