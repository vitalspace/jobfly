<script lang="ts">
  import { navigate } from "svelte-routing";

  function goToSign() {
    navigate("/signup");
  }
</script>

<div class="grid place-items-center">
  <div class="w-full justify-start p-4 xl:w-1/4">
    <h1 class="prompt-semibold text-[#4a485d] text-lg">JOBFLY</h1>
  </div>
</div>
<div class="grid h-screen place-items-center">
  <div class="grid w-full gap-y-6 p-4 xl:w-1/4">
    <div>
      <img
        src="https://images.playground.com/385a63e8699e4c7fadd1c1cea682b823.png"
        alt=""
      />
    </div>
    <div>
      <h2 class="prompt-semibold text-4xl text-[#4a485d]">
        Over <span class="text-[#4969d6]">5,000 Jobs</span> are waiting for you
      </h2>
    </div>
    <div>
      <button
        on:click={goToSign}
        class="prompt-extralight text-lg w-full rounded-xl bg-[#242240] py-3 text-white cursor-pointer"
        >Start searching</button
      >
    </div>
  </div>
</div>
