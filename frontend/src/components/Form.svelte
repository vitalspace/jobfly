<script lang="ts">
    export let fullName: string;
    export let age: number;
    export let location: number;
    export let phone: number;
    export let email: number;
    export let password: number;

</script>

<div class="grid gap-y-2">
    <label for="" class="prompt-extralight text-xs">Full Name</label>
    <input type="text" name="" id="" class="prompt-extralight rounded-xl border py-2 pl-2"  bind:value={fullName}/>
    <label for="" class="prompt-extralight text-xs">Age</label>
    <input type="number" name="" id="" class="prompt-extralight rounded-xl border py-2 pl-2" bind:value={age}/>
    <label for="" class="prompt-extralight text-xs">Location</label>
    <input type="text" name="" id="" class="prompt-extralight rounded-xl border py-2 pl-2"  bind:value={location}/>
    <label for="" class="prompt-extralight text-xs">Phone</label>
    <input type="text" name="" id="" class="prompt-extralight rounded-xl border py-2 pl-2" bind:value={phone} />
    <label for="" class="prompt-extralight text-xs">Email</label>
    <input type="text" name="" id="" class="prompt-extralight rounded-xl border py-2 pl-2"  bind:value={email}/>
    <label for="" class="prompt-extralight text-xs">Password</label>
    <input type="text" name="" id="" class="prompt-extralight rounded-xl border py-2 pl-2"   bind:value={password}/>
    <button class="prompt-semibold rounded-lg bg-black py-3 text-base text-white">Submit</button>
  </div>
  