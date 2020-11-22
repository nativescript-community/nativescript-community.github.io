<script lang="ts">
  import Header from "./partials/Header.svelte";
  import Footer from "./partials/Footer.svelte";
  import ScrollTop from "./partials/ScrollTop.svelte";
  import Items from "./Items.svelte";

	let items;
</script>

<div class="d-flex flex-column flex-root">
  <div class="d-flex flex-row flex-column-fluid page">
    <div class="d-flex flex-column flex-row-fluid wrapper">
      <Header />
      <div class="content d-flex flex-column flex-column-fluid" >
        <Items {items} />
      </div>
      <Footer />
    </div>
  </div>
</div>

<ScrollTop />
