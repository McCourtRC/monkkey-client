<script>
  import InputManger from './components/InputManger.svelte';
  import { path } from 'ramda';
  import Tailwind from './Tailwind.svelte';
  import Header from './components/Header.svelte';

  import Node from './components/Node.svelte';
  import { data, nodeOrderPaths } from './stores';
</script>

<Tailwind />
<InputManger />

<div class="h-full bg-orange-100">
  <Header />
  <div class="p-10 flex justify-between">
    <main>
      <div>
        <Node {...$data} />
      </div>
    </main>

    <div class="w-72">
      <h2 class="text-lg">Navigation</h2>
      <ul>
        <li class="bg-green-200">- Move to Node (Click)</li>
        <li class="bg-green-200">- Move to Next Node (j)</li>
        <li class="bg-green-200">- Move to Prev Node (k)</li>
        <li class="bg-green-200">- Move to Next Sibling (J)</li>
        <li class="bg-green-200">- Move to Prev Sibling (K)</li>
        <li class="bg-green-200">- Move to Parent (O)</li>
        <li class="bg-green-200">
          - Move to Children (I) <div class="text-xs">
            (? can be done with Move to Next Node)
          </div>
        </li>
      </ul>
      <hr class="my-4" />
      <h2 class="text-lg">Actions</h2>
      <ul>
        <li>- Add Sibling</li>
        <li>- Update Name</li>
      </ul>
      <!-- <button class="p-4 rounded bg-emerald-400">Function</button> -->
    </div>
  </div>
</div>
